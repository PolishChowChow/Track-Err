import axios, { AxiosResponse } from "axios";

const queryFn = {
    getAllRecords: async () => {
        // console.log("start fetching data")
        const response = await axios.get<AxiosResponse>("http://192.168.0.114:3000/records")
        // .then(res => {
        //     console.log("res", res);
        //     return res.data.data
        // }).catch(err => {
        //     console.log("err", err);
        // })
        return response.data.data;
    },
    removeRecord: async (id: string) => {
        console.log("an attemptd to remove a record with an id: ", id);
        if(id.length === 0){
            throw Error("removeRecord(): no id provided");
        }
        const response = await axios.delete<AxiosResponse>(`http://192.168.0.114:3000/records/${id}`)
        return response
    }
}

export default queryFn