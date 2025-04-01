import { View } from "react-native";
import Form from "../components/Form/Form";


export default function Home() {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form />
    </View>
  );
}
