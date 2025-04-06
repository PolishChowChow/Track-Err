import { AxiosError, AxiosResponse } from "axios";
import apiClient from "./apiClient";
import { FormFieldsType } from "@/app/components/Form/Form";
import { ErrorRecordTypeWithId } from "@/types/ErrorRecordType";
import queryErrorHandler from "./queryErrorHandler";
import { StructureRecordTypeWithId } from "@/types/StructureType";
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
      queryErrorHandler(err);
    }
  },
  createRecord: async (record: FormFieldsType) => {
    try {
      const response = await apiClient.post<AxiosResponse>("/records", {
        ...record,
      });
      return response;
    } catch (err) {
      queryErrorHandler(err);
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
      queryErrorHandler(err);
    }
  },
  getAllStructures: async () => {
    await delay(5000)
    try {
      const response = await apiClient.get<{data: StructureRecordTypeWithId[]}>("/structures");
      return response.data.data;
    } catch (err) {
      queryErrorHandler(err);
    }
  },
  getOtp: async () => {
    try {
      const response = await apiClient.get<AxiosResponse>("/auth/getOtp");
      return response;
    } catch (err) {
      queryErrorHandler(err);
    }
  },
  verifyOtp: async (otp: string) => {
    try {
      const response = await apiClient.post<AxiosResponse>("/auth/checkOtp", {
        otp,
      });
      return response;
    } catch (err) {
      queryErrorHandler(err);
    }
  },
};

export default queryFn;
