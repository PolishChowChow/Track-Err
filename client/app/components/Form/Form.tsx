import { useForm } from "react-hook-form";
import { View, StyleSheet, ScrollView } from "react-native";
import { ErrorRecordType } from "@/types/ErrorRecordType";
import SelectInput from "./SelectInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import queryFn from "@/app/utils/queries/queryFn";
import { StructureRecordTypeWithId } from "@/types/StructureType";
import { AxiosError } from "axios";
import useGroupedStructuresByType from "@/app/utils/pipelines/useGroupedStructuresByType";
import ErrorComponent from "../Lifecycle/ErrorComponent";
import Loading from "../Lifecycle/Loading";
import SuccessComponent from "../Lifecycle/SuccessComponent";
import { useState } from "react";
import { Button, Headline, MD3Theme, useTheme } from "react-native-paper";

export type FormFieldsType = Omit<ErrorRecordType, "date">;

const defaultValues: FormFieldsType = {
  workstation: "LP2",
  reference: "MPDB",
  tableId: "t101",
  robotId: "r01",
  mountingStation: "m1",
  content: "Wirestick",
};
export default function Form() {
  const theme = useTheme() as MD3Theme & { toggleTheme: () => void };
  const queryClient = useQueryClient();
  const toggleTheme = theme.toggleTheme;
  const { control, handleSubmit } = useForm({
    defaultValues,
  });

  const {
    data: fetchedStructures,
    isError,
    error,
    isLoading,
  } = useQuery<unknown, AxiosError, StructureRecordTypeWithId[]>({
    queryKey: ["structures"],
    queryFn: queryFn.getAllStructures,
  });

  const { mutateAsync: createRecord, isPending } = useMutation({
    mutationFn: queryFn.createRecord,
    onSuccess: () => {
      setSuccessMessage("Created record successfully");
      queryClient.invalidateQueries({
        queryKey: ["error-list"],
        exact: true,
      });
    },
  });
  const [successMessage, setSuccessMessage] = useState("");
  const submitHandler = handleSubmit((data) => {
    createRecord(data);
  });
  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent message={error?.message} />;
  }
  if (!fetchedStructures) {
    return <ErrorComponent message="Invalid data, report this ASAP" />;
  }

  const { workstations, references, tables, robots, mountingStations } =
    useGroupedStructuresByType(fetchedStructures);
  return (
    <View style={{ backgroundColor: theme.colors.secondaryContainer }}>
      <ScrollView style={styles.container}>
        <Headline>Add new record</Headline>
        <SelectInput
          title="Select workstation:"
          records={workstations}
          label="workstation"
          control={control}
        />
        <SelectInput
          title="Reference"
          records={references}
          label="reference"
          control={control}
        />

        <SelectInput
          title="Table number"
          records={tables}
          label="tableId"
          control={control}
        />

        <SelectInput
          title="Robot number"
          records={robots}
          label="robotId"
          control={control}
        />

        <SelectInput
          title="Mounting station"
          records={mountingStations}
          label="mountingStation"
          control={control}
        />

        <SelectInput
          title="Content"
          records={["Wirestick", "SKP", "Freeze error", "Collision"]}
          label="content"
          control={control}
        />

        <Button
          onPress={submitHandler}
          mode="contained"
          style={{
            borderRadius: 2,
            // marginTop: 10,
            margin: 20,
          }}
          disabled={isPending}
        >
          Submit
        </Button>
        <Button
          onPress={() => {
            toggleTheme();
          }}
          mode="contained"
        >
          Submit2
        </Button>
        <SuccessComponent message={successMessage} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    margin: 10,
    marginHorizontal: "auto",
    display: "flex",
  },
});
