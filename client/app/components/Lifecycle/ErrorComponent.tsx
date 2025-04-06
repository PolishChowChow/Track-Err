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
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    margin: 7
  },
  text: {
    color: "#c91d12",
  },
});
