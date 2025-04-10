import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

type ErrorComponentType = {
  message: string;
};

export default function ErrorComponent({ message }: ErrorComponentType) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.errorContainer}]}>
      <Text style={{ color: colors.onErrorContainer}}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    margin: 5,
    padding: 10,
    textAlign: "center",
    boxShadow: "5px 5px 5px black",
    shadowOffset: {
      width: 0,
      height: 1
    },
    elevation: 5,
    shadowOpacity: 1,
    shadowColor: "black",
    borderRadius: 2
  },
});
