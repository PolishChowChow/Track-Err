import queryFn from "@/app/utils/queries/queryFn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OtpModal from "../Modal/OtpModal";
import { StyleSheet, View } from "react-native";
import ErrorList from "./ErrorList";
import { useEffect, useState } from "react";
import jwtHandler from "@/app/utils/JWT/jwtHandler";
export default function ErrorListWrapper() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();
  const { mutateAsync: getOtp} = useMutation({
    mutationFn: queryFn.getOtp
  })
  const { mutateAsync: verifyJwt } = useMutation({
    mutationFn: queryFn.checkJwt,
    onError: () => {
      getOtp();
      setIsModalVisible(true);
    },
  });
  const onPageLoadHandler = async () => {
    const jwt = await jwtHandler.getJwt();
    if (!jwt) {
      getOtp()
      setIsModalVisible(true);
      return;
    }
    const response = await verifyJwt(jwt);
    if(response.status === 200){
      console.log("working??");
        await queryClient.invalidateQueries({
            queryKey: ['error-records']
        })
    }
  };
  useEffect(() => {
    onPageLoadHandler();
  }, []);
  return (
    <>
      {/* <OtpModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        closeModalCallback={() => {}}
      /> */}
      <ErrorList />
    </>
  );
}
