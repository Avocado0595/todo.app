import Task from "./task.interface";
import axiosClient from "../../api/axiosClient";
import { createAsyncThunk } from '@reduxjs/toolkit';



export const getTaskList = createAsyncThunk(
    'task/getTaskList',
    async (_, { rejectWithValue }) => {
        const response = await axiosClient.get('/tasks');
        if (response.status < 200 || response.status >= 300)
            rejectWithValue('Can not get task list');
        return response.data as Task[];
    }
)


// export const updateTodos = async (params:string,todo: Partial<ITodo>) => {
//     const response = await axiosClient.put(`/todo/${params}`, todo);
//     return response;
// };

// export const createTodos = async (todo: Partial<ITodo>) => {
//     const response = await axiosClient.post("/todo", todo);
//     return response;
// }