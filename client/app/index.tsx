import { Text, View } from "react-native";
import ErrorList from "./components/ErrorList";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <ErrorList />
    </View>
  );
}
