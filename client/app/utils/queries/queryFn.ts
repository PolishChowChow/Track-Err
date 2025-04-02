import { AxiosResponse } from "axios";
import apiClient from "./apiClient";

const queryFn = {
    getAllRecords: async () => {
        const response = await apiClient.get<AxiosResponse>("/records")
        return response.data.data;
    },
    removeRecord: async (id: string) => {
        console.log("an attemptd to remove a record with an id: ", id);
        if(id.length === 0){
            throw Error("removeRecord(): no id provided");
        }
        const response = await apiClient.delete<AxiosResponse>(`/records/${id}`)
        return response
    }
}

export default queryFn