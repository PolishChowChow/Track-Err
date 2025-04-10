import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

type ErrorComponentType = {
  message: string;
};

export default function ErrorComponent({ message }: ErrorComponentType) {
  const { colors } = useTheme();
  return (
    <View style={{ backgroundColor: colors.errorContainer}}>
      <Text style={{ color: colors.onErrorContainer}}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    margin: 7
  },
});
