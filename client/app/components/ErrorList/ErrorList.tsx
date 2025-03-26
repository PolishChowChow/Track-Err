import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import  ErrorRecordWrapper from "./ErrorRecordWrapper"
import queryFn from "@/app/utils/queryFn";

export default function ErrorList() {
  const { data: records } = useQuery<unknown,AxiosError,ErrorRecordTypeWithId[]>({
    queryKey: ["error-list"],
    queryFn: queryFn.getAllRecords
  });
  return (
    <ScrollView style={styles.container}>
      {records && records.map(record => {
        return <ErrorRecordWrapper record={record} key={record.id}/>
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    container: {
      maxWidth: 300
    }
})