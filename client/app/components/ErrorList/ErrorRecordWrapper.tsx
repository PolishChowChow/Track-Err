import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
} from "react-native";
import ErrorRecord, { ErrorRecordProps } from "./ErrorRecord";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import useGettingValueFromPanResponder from "@/app/utils/panResponder/useGettingValueFromPanResponder";
import usePanResponderToSwipeComponent from "@/app/utils/panResponder/usePanResponderToSwipeComponent";
import { Surface } from "react-native-paper";

type ErrorRecordWrapperProps = {
  onDelete: UseMutateAsyncFunction<AxiosResponse<AxiosResponse<any, any>, any> | undefined, Error, string, void>;
  afterDelete: (id: string) => void;
} & ErrorRecordProps;
export default function ErrorRecordWrapper({
  record,
  onDelete,
  afterDelete,
}: ErrorRecordWrapperProps) {
  const panX = useRef(new Animated.Value(0)).current;
  const latestX = useGettingValueFromPanResponder(panX)
  const panHandlers = usePanResponderToSwipeComponent(
    panX,
    latestX,
    -150,
    -300,
    async () => {
      const result = await onDelete(record.id);
      if (!result || result.status === 200) {
        afterDelete(record.id);
      }
    }
  );
  return (
    <Surface style={styles.container} elevation={1}>
      <View style={styles.background}></View>
      <Animated.View
        style={{
          transform: [{ translateX: panX }],
        }}
        {...panHandlers}
      >
        <ErrorRecord record={record} />
      </Animated.View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginVertical: 8,
  },
  background: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "red",
    // justifyContent: "center",
    // alignItems: "flex-end",
  },
  main: {
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 4,
  },
});
