import { AxiosError } from "axios";

export default function errorHandler(err: unknown): never{
    if(err instanceof AxiosError){
        throw new Error(err.message)
    }
    else if(err instanceof Error){
        throw new Error(err.message)
    }
    throw new Error("Unexpected error happened, try again Later!")
}