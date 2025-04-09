import React, { useRef } from "react";
import { View, StyleSheet, Animated, Text } from "react-native";
import ErrorRecord, { ErrorRecordProps } from "./ErrorRecord";
import { UseMutateAsyncFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import useGettingValueFromPanResponder from "@/app/utils/panResponder/useGettingValueFromPanResponder";
import usePanResponderToSwipeComponent from "@/app/utils/panResponder/usePanResponderToSwipeComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Surface, useTheme } from "react-native-paper";

type ErrorRecordWrapperProps = {
  onDelete: UseMutateAsyncFunction<
    AxiosResponse<AxiosResponse<any, any>, any> | undefined,
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
  const theme = useTheme();
  const panX = useRef(new Animated.Value(0)).current;
  const latestX = useGettingValueFromPanResponder(panX);
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
    <Surface style={styles.container} elevation={3}>
      {/* <View
        style={[
          { ...styles.background },
          { backgroundColor: theme.colors.onErrorContainer },
        ]}
      >
        <Icon name="delete" color="white" size={30} />
      </View> */}
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
    marginVertical: 8
  },
  background: {
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "center",
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 20,
    width: 300,
  },
  main: {
    fontSize: 16,
    backgroundColor: "white",
    borderRadius: 4,
  },
  errorMessage: {
    textAlign: "right",
  },
});
