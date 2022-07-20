import axios, { AxiosError } from 'axios';
import queryString from 'query-string';
import { IResponse } from '../interfaces/IResponse';
const REACT_APP_API_URL = "http://localhost:5001/api";

const axiosClient = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        'content-type':'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});
axiosClient.defaults.withCredentials= true;


axiosClient.interceptors.response.use((response)=>{
    return response.data;
},(err)=>{
    throw new Error(err.response.data.message)});

export default axiosClient;