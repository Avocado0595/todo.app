import { AxiosResponse } from "axios";

export interface IResponse extends AxiosResponse {
    result: boolean;
    message: string;
    data: any;
    token:string;
}