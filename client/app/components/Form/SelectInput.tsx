import { ErrorRecordFields, ErrorRecordType } from "@/types/ErrorRecordType";
import { Picker } from "@react-native-picker/picker";
import { Control, Controller, FieldValues } from "react-hook-form";
import { FormFieldsType } from "./Form";

type SelectInputType = {
  records: string[];
  label: ErrorRecordFields;
  control: Control<FormFieldsType, any, FormFieldsType>
};
export default function SelectInput({
  records,
  label,
  control,
}: SelectInputType) {
  const pickers = records.map((record, key) => (
    <Picker.Item label={record} value={record} key={key} />
  ));

  return (
    <Controller
      control={control}
      name={label}
      render={({ field: { onChange, value }}) => {
        return (
          <Picker selectedValue={value} onValueChange={onChange} >
            {pickers}
          </Picker>
        );
      }}
    />
  );
}
