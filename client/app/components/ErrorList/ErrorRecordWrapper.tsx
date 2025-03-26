import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import ErrorRecord, { ErrorRecordProps } from "./ErrorRecord";

export default function ErrorRecordWrapper({record}: ErrorRecordProps) {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
        translateX.value = Math.max(event.translationX, -300);
    })
    .onEnd(() => {
      if (translateX.value < -100) {
        translateX.value = withTiming(-300, { duration: 150 });
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <View style={styles.container}>
        <View style={styles.deleteBackground}>
          <Text style={styles.deleteText}>🗑️ Delete</Text>
        </View>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.swipeable, animatedStyle]}>
            <ErrorRecord record={record} />
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 8,
  },
  deleteBackground: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 30,
    borderRadius: 10,
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "right"
  },
  swipeable: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    elevation: 3,
  },
  text: {
    fontSize: 16,
  },
});
