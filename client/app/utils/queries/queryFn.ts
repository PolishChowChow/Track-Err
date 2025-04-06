import { AxiosResponse } from "axios";
import apiClient from "./apiClient";
import { FormFieldsType } from "@/app/components/Form/Form";
import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import { StructureRecordTypeWithId } from "@/types/StructureType";
import errorHandler from "./errorHandler";
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const queryFn = {
  getAllRecords: async () => {
    try {
      const { data } = await apiClient.get<{ data: ErrorRecordTypeWithId[] }>(
        "/records"
      );
      return data.data || [];
    } catch (err) {
      errorHandler(err);
    }
  },
  createRecord: async (record: FormFieldsType) => {
    try {
      const response = await apiClient.post<AxiosResponse>("/records", {
        ...record,
      });
      return response;
    } catch (err) {
      errorHandler(err);
    }
  },
  removeRecord: async (id: string) => {
    if (id.length === 0) {
      throw Error("removeRecord(): no id provided");
    }
    try {
      const response = await apiClient.delete<AxiosResponse>(`/records/${id}`);
      return response;
    } catch (err) {
      errorHandler(err);
    }
  },
  getAllStructures: async () => {
    await delay(5000)
    try {
      const response = await apiClient.get<{data: StructureRecordTypeWithId[]}>("/structures");
      return response.data.data;
    } catch (err) {
      errorHandler(err);
    }
  },
  getOtp: async () => {
    try {
      const response = await apiClient.get<AxiosResponse>("/auth/getOtp");
      return response;
    } catch (err) {
      errorHandler(err);
    }
  },
  verifyOtp: async (otp: string) => {
    try {
      const response = await apiClient.post<AxiosResponse>("/auth/checkOtp", {
        otp,
      });
      console.log(response.headers);
      return response;
    } catch (err) {
      errorHandler(err);
    }
  },
};

export default queryFn;
