import ITodo from "../interfaces/ITodo";
import axiosClient  from "./axiosClient";

export const getTodos = async () => {
    const response = await axiosClient.get("/todo");
    return response;
}

export const updateTodos = async (params:string,todo: Partial<ITodo>) => {
    const response = await axiosClient.put(`/todo/${params}`, todo);
    return response;
};

export const createTodos = async (todo: Partial<ITodo>) => {
    const response = await axiosClient.post("/todo", todo);
    return response;
}