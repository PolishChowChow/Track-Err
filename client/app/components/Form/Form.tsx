import { useForm } from "react-hook-form";
import { View, Text, Button } from "react-native";
import { ErrorRecordType } from "@/types/ErrorRecordType";
import SelectInput from "./SelectInput";
import { useQuery } from "@tanstack/react-query";
import queryFn from "@/app/utils/queries/queryFn";
import { StructureRecordTypeWithId } from "@/types/StructureType";
import { AxiosError } from "axios";
import useGroupedStructuresByType from "@/app/utils/pipelines/useGroupedStructuresByType";

export type FormFieldsType = Omit<ErrorRecordType, "date">;

const defaultValues: FormFieldsType = {
  workstation: "LP2",
  reference: "MPDB",
  tableId: "t101",
  robotId: "r01",
  mountingStation: "m1",
  content: "",
};
export default function Form() {
  const { control } = useForm({
    defaultValues,
  });
  const {
    data: fetchedStructures,
    isError,
    isLoading,
  } = useQuery<unknown, AxiosError, StructureRecordTypeWithId[]>({
    queryKey: ["structures"],
    queryFn: queryFn.getAllStructures,
  });
  if (isError || fetchedStructures === undefined) {
    return (
      <View>
        <Text>Error fetching</Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View>
        <Text>Is loading</Text>
      </View>
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
        <SelectInput
          records={references}
          label="reference"
          control={control}
        />
      </View>
      <View>
        <Text>Selected tableid:</Text>
        <SelectInput
          records={tables}
          label="tableId"
          control={control}
        />
      </View>
      <View>
        <Text>Selected robotId:</Text>
        <SelectInput
          records={robots}
          label="robotId"
          control={control}
        />
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
      <Button title="Submit" />
    </View>
  );
}
