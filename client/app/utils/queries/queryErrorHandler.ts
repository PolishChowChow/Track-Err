import { AxiosError } from "axios";

export default function queryErrorHandler(err: unknown){
    if(err instanceof AxiosError){
        throw new Error(err.message)
    }
    else if(err instanceof Error){
        throw new Error(err.message)
    }
    throw new Error("Some error happened")
}