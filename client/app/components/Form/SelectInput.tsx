import { ErrorRecordFields } from "@/types/ErrorRecordType";
import { Control, Controller } from "react-hook-form";
import { FormFieldsType } from "./Form";
import { Paragraph } from "react-native-paper";
import { Dropdown } from "react-native-paper-dropdown";
import { View, StyleSheet } from "react-native"
type SelectInputType = {
  title: string;
  records: string[];
  label: ErrorRecordFields;
  control: Control<FormFieldsType, any, FormFieldsType>;
};
export default function SelectInput({
  records,
  label,
  control,
  title
}: SelectInputType) {
  const options = records.map((record, key) => {
    return { value: record, label: record };
  });

  return (
    <View style={styles.container}>
      <Paragraph>{title}</Paragraph>
      <Controller
      control={control}
      name={label}
      render={({ field: { onChange, value } }) => (
        <>
          <Dropdown
            label={label}
            mode="outlined"
            placeholder="Select sth"
            value={value}
            onSelect={onChange}
            options={options}
          />
        </>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 5
  }
})