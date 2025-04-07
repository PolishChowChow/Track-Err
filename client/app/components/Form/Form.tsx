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
import { Paragraph, Button, Headline } from "react-native-paper";

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
  const queryClient = useQueryClient();
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
          marginTop: 10,
        }}
        disabled={isPending}
      >
        Submit
      </Button>
      <SuccessComponent message={successMessage} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginTop: 30,
    marginHorizontal: "auto",
    display: "flex",
  },
});
