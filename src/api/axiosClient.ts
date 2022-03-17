import axios, { AxiosRequestConfig } from 'axios';
import queryString from 'query-string';

const getToken = ()=>{
    const hasToken = localStorage.getItem('todoToken');
    if (!hasToken) return null;
    return hasToken;
}
const REACT_APP_API_URL = "http://localhost:5500/api";
const axiosClient = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        'content-type':'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config:AxiosRequestConfig)=>{
    const token = getToken();
    if(token)
        config.headers={Authorization: `${token}`};
return config;
})

axiosClient.interceptors.response.use((response)=>{
    if (response && response.data){
        return response.data;
    }
    return response;
},
(error)=>{
    throw error;
})

export default axiosClient;