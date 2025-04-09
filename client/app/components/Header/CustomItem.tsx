import { Menu } from "react-native-paper";
import { View } from "react-native"
type CustomItemProps = {
  label: string;
  selectedValue: string;
  onPress: (label: string) => void;
  color: string;
};
export default function CustomItem({
  label,
  selectedValue,
  onPress,
  color,
}: CustomItemProps) {
  return (
    <View style={{
        padding: 5
    }}>
        <Menu.Item
      title={label}
      style={{
        borderBottomWidth: 2,
        borderBottomColor: selectedValue === label ? color : "transparent",
      }}
      onPress={() => onPress(label)}
    />
    </View>
  );
}
