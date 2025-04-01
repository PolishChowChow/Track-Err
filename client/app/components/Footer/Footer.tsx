import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
export default function Footer() {
  return (
    <View style={styles.container}>
      <Link href="/" style={styles.link}>
        index
        <Pressable
          style={({ pressed }) => [
            styles.linkContainer,
            pressed && styles.linkContainerTouched,
          ]}
        ></Pressable>
      </Link>
      <Link href="/home" style={styles.link}>
        <Pressable
          style={({ pressed }) => [
            styles.linkContainer,
            pressed && styles.linkContainerTouched,
          ]}
        ></Pressable>
        home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },
  linkContainer: {
    // flexGrow: 1,
    // padding: 20,
    // display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
  },
  linkContainerTouched: {
    backgroundColor: "#CCC",
    opacity: 1,
  },
  link: {
    flexGrow: 1,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
