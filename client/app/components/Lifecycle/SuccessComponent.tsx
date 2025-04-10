import { Text, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

type SuccessComponentType = {
  message: string;
};

export default function SuccessComponent({ message }: SuccessComponentType) {
  const { dark } = useTheme();
  return (
      <View
        style={[
          styles.container,
          { backgroundColor: dark ? "rgb(28, 82, 10)" : "rgb(181, 243, 154)" },
        ]}
      >
        <Text style={{ color: dark ? "rgb(181, 243, 154)" : "rgb(4, 33, 0)", textAlign: "center" }}>
          {message}
        </Text>
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
    elevation: 3,
    shadowOpacity: 1,
    shadowColor: "black",
    borderRadius: 2
  },
});
