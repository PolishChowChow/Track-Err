import axios, { AxiosResponse } from "axios";


const queryFn = {
    getAllRecords:  async () => {
        const response = await axios.get<AxiosResponse>("http://192.168.0.112:3000/records")
        return response.data.data;
    },
    removeRecord: async (id: string) => {
        if(id.length === 0){
            throw Error("removeRecord(): no id provided");
        }
        const response = await axios.delete<AxiosResponse>(`http://192.168.0.112:3000/records/${id}`)
        return response.data
    }   

}

export default queryFn