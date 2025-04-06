import { Text, View, StyleSheet } from "react-native";

type ErrorComponentType = {
  message: string;
};

export default function ErrorComponent({ message }: ErrorComponentType) {
  return (
    <View>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    color: "#c91d12",
  },
});
