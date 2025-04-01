import { useForm } from "react-hook-form";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
export default function Form() {
  // const form = useForm();
  const [selectedValue, setSelectedValue] = useState("LP1");

  return (
    <View>
      <Text>Selected item: {selectedValue}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(value) => setSelectedValue(value)}
      >
        <Picker.Item label="LP1" value="LP1" />
        <Picker.Item label="LP2" value="LP2" />
      </Picker>
    </View>
  );
}
