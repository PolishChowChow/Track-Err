import { useForm } from "react-hook-form";
import { View, Text, Button } from "react-native";
import { ErrorRecordType } from "@/types/ErrorRecordType";
import SelectInput from "./SelectInput";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import queryFn from "@/app/utils/queries/queryFn";
import { StructureRecordTypeWithId } from "@/types/StructureType";
import { AxiosError } from "axios";
import useGroupedStructuresByType from "@/app/utils/pipelines/useGroupedStructuresByType";
import ErrorComponent from "../Lifecycle/ErrorComponent";
import Loading from "../Lifecycle/Loading";

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

  const { mutateAsync: createRecord } = useMutation({
    mutationFn: queryFn.createRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["error-list"],
        exact: true,
      });
    },
  });

  const submitHandler = handleSubmit((data) => {
    createRecord(data);
  });
  if (!fetchedStructures) {
    return <ErrorComponent message="Invalid data, report this ASAP" />;
  }
  if (isError) {
    return <ErrorComponent message={error?.message} />;
  }
  if (isLoading) {
    return (
      <Loading />
    );
  }
  const { workstations, references, tables, robots, mountingStations } =
    useGroupedStructuresByType(fetchedStructures);
  return (
    <View>
      <View>
        <Text>Select workstation: </Text>
        <SelectInput
          records={workstations}
          label="workstation"
          control={control}
        />
      </View>
      <View>
        <Text>Selected reference:</Text>
        <SelectInput records={references} label="reference" control={control} />
      </View>
      <View>
        <Text>Selected tableid:</Text>
        <SelectInput records={tables} label="tableId" control={control} />
      </View>
      <View>
        <Text>Selected robotId:</Text>
        <SelectInput records={robots} label="robotId" control={control} />
      </View>
      <View>
        <Text>Selected mounting station:</Text>
        <SelectInput
          records={mountingStations}
          label="mountingStation"
          control={control}
        />
      </View>
      <View>
        <Text>Select error:</Text>
        <SelectInput
          records={["Wirestick", "SKP", "Freeze error"]}
          label="content"
          control={control}
        />
      </View>
      <Button title="Submit" onPress={submitHandler} />
    </View>
  );
}
