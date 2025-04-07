import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ScrollView, StyleSheet, View } from "react-native";
import ErrorRecordWrapper from "./ErrorRecordWrapper";
import queryFn from "@/app/utils/queries/queryFn";
import { useEffect, useState } from "react";
import OtpModal from "../Modal/OtpModal";
import Loading from "../Lifecycle/Loading";
import ErrorComponent from "../Lifecycle/ErrorComponent";
import jwtHandler from "@/app/utils/JWT/jwtHandler";
import { useTheme } from "react-native-paper";

export default function ErrorList() {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const [errorRecords, setErrorRecords] = useState<ErrorRecordTypeWithId[]>(
    records || []
  );
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
  

  const deleteJWT = async () =>{
    await jwtHandler.deleteJwt();
  }
  useEffect(() => {
    deleteJWT();
    setErrorRecords(records || []);
    
  }, [records]);
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <ErrorComponent message={error.message} />;
  }
  return (
    <View style={{ backgroundColor: theme.colors.secondaryContainer }}>
      <ScrollView style={[styles.container]}>
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
    </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    maxWidth: 300,
    marginHorizontal: "auto"
  },
});
