import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { View, Text, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import ErrorRecord from "./ErrorRecord";
import ErrorRecordWrapper from "./ErrorRecordWrapper";
export default function ErrorList() {
  const { data: records } = useQuery<unknown,AxiosError,ErrorRecordTypeWithId[]>({
    queryKey: ["error-list"],
    queryFn: async () => {
      console.log("start!")
      const response = await axios.get<AxiosResponse>("http://192.168.0.112:3000/records")
      console.log(response.data.data[0])
      return response.data.data;
    },
  });
  return (
    <ScrollView style={styles.container}>
      {records && records.map(record => {
        return <ErrorRecordWrapper record={record} />
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    container: {
      maxWidth: 300
    }
})