// app/(tabs)/_layout.js
// import { Tabs } from "expo-router";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text } from "react-native";
// import { useNavigation } from "expo-router";
// import { useEffect } from "react";
export default function Layout() {
  // const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs>
        <TabSlot />
        <TabList style={styles.tabContainer}>
          <TabTrigger name="home" href="/(tabs)/home" style={styles.tab}>
            <Text style={styles.text}>Home</Text>
          </TabTrigger>
          <TabTrigger name="index" href="/" style={styles.tab}>
            <Text style={styles.text}>Index</Text>
          </TabTrigger>
        </TabList>
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabContainer: { backgroundColor: "#333" },
  tab: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
  },
  text: {
    textAlign: "center"
  }
});
