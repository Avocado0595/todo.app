import { IResponse } from "../interfaces/IResponse";
import { UserAuth, UserSignUp } from "../interfaces/user-auth.interface";
import axiosClient  from "./axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userSignUp = createAsyncThunk(
    'user/signup',
    async (user:UserSignUp, { rejectWithValue }) => {
      // Gọi lên API backend
      const response = await axiosClient.post("/auth/signup", user);
  
      // Convert dữ liệu ra json
      const jsonData = await response.data;
  
      // Nếu bị lỗi thì reject
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(jsonData);
      }
      return jsonData;
    }
  );

  export const userSignIn = createAsyncThunk(
    'user/signin',
    async (user:UserAuth, { rejectWithValue }) => {
      const response = await axiosClient.post("/auth/signin", user);
      const jsonData = await response.data;
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(jsonData);
      }
      return jsonData;
    }
  );
//TODO: update user
