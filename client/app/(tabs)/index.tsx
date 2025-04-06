import { Text, View } from "react-native";
import ErrorList from "../components/ErrorList/ErrorList";
import ErrorListWrapper from "../components/ErrorList/ErrorListWrapper";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Test list</Text>
      <ErrorListWrapper />
    </View>
  );
}