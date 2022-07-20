import { AxiosResponse } from "axios";

export interface IResponse extends AxiosResponse {
    status: number,
    message: string,
    data: any
}