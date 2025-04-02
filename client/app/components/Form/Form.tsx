import { useForm } from "react-hook-form";
import { View, Text, Button } from "react-native";
import { ErrorRecordType } from "@/types/ErrorRecordType";
import SelectInput from "./SelectInput";
import { useQuery } from "@tanstack/react-query";

export type FormFieldsType = Omit<ErrorRecordType, "date">;

const defaultValues: FormFieldsType = {
  workstation: "LP1",
  reference: "MPDB",
  tableId: "t101",
  robotId: "r01",
  mountingStation: "none",
  content: "",
};
export default function Form() {
  const { control } = useForm({
    defaultValues,
  });

  return (
    <View>
      <View>
        <Text>Select workstation: </Text>
        <SelectInput
          records={["LP1", "LP2"]}
          label="workstation"
          control={control}
        />
      </View>
      <View>
        <Text>Selected reference:</Text>
        <SelectInput
          records={["MPDB", "ICE", "TRYOUT"]}
          label="reference"
          control={control}
        />
      </View>
      <View>
        <Text>Selected tableid:</Text>
        <SelectInput
          records={[
            "t101",
            "t102",
            "t301",
            "t302",
            "t303",
            "t304",
            "t50",
            "t60",
          ]}
          label="tableId"
          control={control}
        />
      </View>
      <View>
        <Text>Selected robotId:</Text>
        <SelectInput
          records={["r01", "r02", "r03", "r04", "r05", "r06", "r07", "r08"]}
          label="robotId"
          control={control}
        />
      </View>
      <View>
        <Text>Select error:</Text>
        <SelectInput
          records={["Wirestick", "SKP", "Freeze error"]}
          label="robotId"
          control={control}
        />
      </View>
      <Button title="Submit" />
    </View>
  );
}
