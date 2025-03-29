import { Button, Text, View } from "react-native";
import ErrorList from "./components/ErrorList/ErrorList";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello</Text>
      <Link href='/home'>home</Link>
        <Link href='/'>index</Link>
    </View>
  );
}
