import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  PanResponder,
  Animated,
} from "react-native";
import ErrorRecord, { ErrorRecordProps } from "./ErrorRecord";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import useGettingValueFromPanResponder from "@/app/utils/useGettingValueFromPanResponder";
import usePanResponderToSwipeComponent from "@/app/utils/usePanResponderToSwipeComponent";

type ErrorRecordWrapperProps = {
  onDelete: UseMutateAsyncFunction<
    AxiosResponse<any, any>,
    Error,
    string,
    void
  >;
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
      if (result.status === 200) {
        afterDelete(record.id);
      }
    }
  );
  return (
    <View style={styles.container}>
      <View style={styles.background}></View>

      <Animated.View
        style={{
          transform: [{ translateX: panX }],
        }}
        {...panHandlers}
      >
        <ErrorRecord record={record} />
      </Animated.View>
    </View>
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
    justifyContent: "center",
    alignItems: "flex-end",
  },
  main: {
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 4,
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: "blue",
  },
});
