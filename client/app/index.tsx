import { Text, View } from "react-native";
import ErrorList from "./components/ErrorList/ErrorList";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text></Text>
      <ErrorList />
    </View>
  );
}
