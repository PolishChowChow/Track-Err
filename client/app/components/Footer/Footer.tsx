import { View, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router"
export default function Footer() {
  return (
    <View style={styles.container}>
      <Pressable style={
        ({ pressed }) => [
          styles.linkContainer,
          pressed && styles.linkContainerTouched
        ]
      } >
        <Link href="/">index</Link>
      </Pressable>
      <Pressable style={
        ({ pressed }) => [
          styles.linkContainer,
          pressed && styles.linkContainerTouched
        ]
      } >
        <Link style={styles.link} href="/home">home</Link>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    gap: 10
  },
  linkContainer: {
    flexGrow: 1,
    padding: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  linkContainerTouched: {
    backgroundColor: "#CCC",
    opacity: 1
  },
  link:{
    width: 50,
    height: 50
  }
})
