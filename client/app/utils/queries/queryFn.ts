import { AxiosResponse } from "axios"; 
import apiClient from "./apiClient";
import { FormFieldsType } from "@/app/components/Form/Form";
const queryFn = {
  getAllRecords: async () => {
    const response = await apiClient.get<AxiosResponse>("/records");
    return response.data.data;
  },
  createRecord: async (record: FormFieldsType) => {
    const response = await apiClient.post<AxiosResponse>("/records", {
      ...record,
    });
    return response;
  },
  removeRecord: async (id: string) => {
    if (id.length === 0) {
      throw Error("removeRecord(): no id provided");
    }
    const response = await apiClient.delete<AxiosResponse>(`/records/${id}`);
    return response;
  },
  getAllStructures: async () => {
    const response = await apiClient.get<AxiosResponse>("/structures");
    return response.data.data;
  },
  getOtp: async () => {
    const response = await apiClient.get<AxiosResponse>("/auth/getOtp");
    return response;
  },
  verifyOtp: async (otp: string) => {
    await apiClient.post<AxiosResponse>("/auth/checkOtp", {
      otp,
    })
    .then(response => response)
    .catch(error => {
        throw new Error("bad")
    })
  },
};

export default queryFn;
