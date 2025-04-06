import { Text, View, StyleSheet } from "react-native";

type SuccessComponentType = {
  message: string;
};

export default function SuccessComponent({ message }: SuccessComponentType) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    margin: 5,
},
text: {
    color: "green",
  },
});
