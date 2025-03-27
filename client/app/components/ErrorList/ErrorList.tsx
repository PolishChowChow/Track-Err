import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ScrollView, StyleSheet, Text } from "react-native";
import ErrorRecordWrapper from "./ErrorRecordWrapper";
import queryFn from "@/app/utils/queryFn";
import { useEffect, useState } from "react";

export default function ErrorList() {
  const queryClient = useQueryClient();
  const { data: records } = useQuery<
    unknown,
    AxiosError,
    ErrorRecordTypeWithId[]
  >({
    queryKey: ["error-list"],
    queryFn: queryFn.getAllRecords,
  });
  const [errorRecords, setErrorRecords] = useState<ErrorRecordTypeWithId[]>(
    records || []
  );
  useEffect(() => {
    setErrorRecords(records || [])
  },[records])
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
  return (
    <ScrollView style={styles.container}>
      {errorRecords &&
        errorRecords.map((errorRecord) => {
          return (
            <ErrorRecordWrapper
              record={errorRecord}
              key={errorRecord.id}
              onDelete={onDelete}
              afterDelete={removeRecordFromUi}
            />
          );
        })}
      <Text>Hi</Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    maxWidth: 300,
  },
});
