import queryFn from "@/app/utils/queries/queryFn";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  StatusBar,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ErrorComponent from "../Lifecycle/ErrorComponent";

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
  const [otpData, setOtpData] = useState({
    value: "",
    error: "",
  });
  const getOtp = useMutation({
    mutationFn: async () => {},
  });
  const { mutateAsync: verifyOtp } = useMutation({
    mutationFn: queryFn.verifyOtp,
    onSuccess: () => {
      setOtpData({
        value: "",
        error: "",
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
      <StatusBar backgroundColor="#333" />
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
          <View style={styles.modal}>
            <View>
              <Text>Enter your Otp:</Text>
              <TextInput
                style={styles.input}
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
              />
            </View>
            <ErrorComponent message={otpData.error} />
            <Button title="Submit" onPress={handleSubmit} />
          </View>
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
    width: 200,
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -50 }],
    backgroundColor: "white",
    paddingVertical: 30,
    paddingHorizontal: 15,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  ruby: {
    color: "#800",
  },
});
