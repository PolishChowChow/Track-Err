import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ScrollView, StyleSheet, View } from "react-native";
import ErrorRecordWrapper from "./ErrorRecordWrapper";
import queryFn from "@/app/utils/queries/queryFn";
import { useEffect, useMemo, useState } from "react";
import Loading from "../Lifecycle/Loading";
import ErrorComponent from "../Lifecycle/ErrorComponent";
import { Paragraph, useTheme } from "react-native-paper";
import { useMainContext } from "@/context/MainContextProvider";

export default function ErrorList() {
  const queryClient = useQueryClient();
  const theme = useTheme();
  const {
    data: records,
    isLoading,
    isError,
    error,
  } = useQuery<unknown, AxiosError, ErrorRecordTypeWithId[]>({
    queryKey: ["error-list"],
    queryFn: queryFn.getAllRecords,
  });
  const { filter } = useMainContext();
  const [errorRecords, setErrorRecords] = useState<ErrorRecordTypeWithId[]>(
    records || []
  );

  const filteredRecords = useMemo((): ErrorRecordTypeWithId[] => {
    return errorRecords.filter(
      (record) => filter === "ALL" || record.reference === filter
    );
  }, [errorRecords, filter]);

  const removeRecordFromUi = (id: string) => {
    setErrorRecords((prevErrorRecords) => {
      return prevErrorRecords.filter((record) => record.id !== id);
    });
  };

  const { mutateAsync: onDelete } = useMutation({
    mutationFn: queryFn.removeRecord,
    onMutate: () => {
      queryClient.invalidateQueries({
        queryKey: ["error-list"],
        exact: true,
      });
    },
  });

  useEffect(() => {
    setErrorRecords(records || []);
  }, [records]);
  return (
    <View style={{ backgroundColor: theme.colors.secondaryContainer }}>
      <ScrollView style={[styles.container]} contentContainerStyle={{
        minHeight: "100%",
        display: "flex",
        justifyContent: "center",
      }}>
      {isError && <ErrorComponent message={error.message} />}
      {isLoading && <Loading />}
        {filteredRecords &&
          filteredRecords.length > 0 &&
          filteredRecords.map((errorRecord) => {
            return (
              <ErrorRecordWrapper
                record={errorRecord}
                key={errorRecord.id}
                onDelete={onDelete}
                afterDelete={removeRecordFromUi}
              />
            );
          })}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    maxWidth: 300,
    marginHorizontal: "auto",
    minHeight: 200,
    height: "100%",
  },
});
