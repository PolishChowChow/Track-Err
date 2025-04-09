import queryFn from "@/app/utils/queries/queryFn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import jwtHandler from "@/app/utils/JWT/jwtHandler";
import { AxiosError } from "axios";
import { Button, Headline, HelperText, Paragraph, Surface, TextInput, useTheme } from "react-native-paper";

type OtpModalProps = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  closeModalCallback: () => void;
};

export default function OtpModal({
  isVisible,
  setIsVisible,
  closeModalCallback,
}: OtpModalProps) {
  const queryClient = useQueryClient();
  const { colors } = useTheme();
  const [otpData, setOtpData] = useState({
    value: "",
    error: "",
  });

  const { mutateAsync: verifyOtp } = useMutation<string, AxiosError, string>({
    mutationFn: queryFn.verifyOtp,
    onSuccess: async (data) => {
      setOtpData({
        value: "",
        error: "",
      });
      await jwtHandler.setJwt(data);
      queryClient.invalidateQueries({
        queryKey: ["error-list"],
        exact: true,
      });
      setIsVisible(false);
    },
    onError: (error) => {
      setOtpData({
        value: "",
        error: error.message,
      });
    },
  });
  const handleSubmit = () => {
    if (otpData.value.length !== 6) {
      setOtpData((prevOtpData) => {
        return {
          ...prevOtpData,
          error: "Invalid OTP Length",
        };
      });
    } else {
      verifyOtp(otpData.value);
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.modalContainer}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isVisible}
          onRequestClose={() => {
            closeModalCallback();
            setIsVisible(!isVisible);
          }}
        >
          <View style={styles.modalBackground}></View>
          <Surface elevation={2} style={[styles.modal, {
            backgroundColor: colors.background
          }]}>
          <View style={{
            backgroundColor: colors.background
          }}>
            <View>
              <Headline>Authorization</Headline>
              <Paragraph>Enter your Otp:</Paragraph>

              <TextInput
                placeholder="098765"
                keyboardType="numeric"
                maxLength={6}
                value={otpData.value}
                onChangeText={(text: string) => {
                  setOtpData((prevOtpData) => {
                    return {
                      ...prevOtpData,
                      value: text,
                    };
                  });
                }}
                right={<TextInput.Affix text="/6" />}
              />
            </View>
            <HelperText type="error" visible={otpData.error !== ""}>
              {otpData.error}
            </HelperText>
            <Button onPress={handleSubmit} mode="contained-tonal">Submit</Button>
          </View>
          </Surface>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackground: {
    backgroundColor: "#333",
    opacity: 0.4,
    flex: 1,
    padding: 20,
    position: "relative",
  },
  modal: {
    position: "absolute",
    zIndex: 1,
    minWidth: 200,
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
    backgroundColor: "white",
    paddingVertical: 40,
    paddingHorizontal: 30,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    borderRadius: 20
  },
});
