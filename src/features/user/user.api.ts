import { IResponse } from "../../interfaces/IResponse";
import { UserAuth, UserSignUp } from "../../interfaces/user-auth.interface";
import axiosClient  from "../../api/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userInit = createAsyncThunk(
  'user/init',
  async (data, { rejectWithValue }) => {
      try{
        const res = await axiosClient.get("/auth")
        return await res.data;
      }
      catch(err: unknown){
        return rejectWithValue(null);
      }
  }
);

export const userSignUp = createAsyncThunk(
    'user/signup',
    async (user:UserSignUp, { rejectWithValue }) => {
      try{
        const response = await axiosClient.post("/auth/signup", user);
        const jsonData = await response.data;
        return jsonData;
      }
      catch(err:unknown){
          return rejectWithValue((<{message:string}>err).message);
        
      }
     
    }
  );

  export const userSignIn = createAsyncThunk(
    'user/signin',
    async (user:UserAuth, { rejectWithValue }) => {
     
      try{
        const response = await axiosClient.post("/auth/signin", user);
        const jsonData = await response.data;
        return jsonData;
      }
      catch(err: unknown){
        return rejectWithValue((<{message:string}>err).message);
      }
    }
  );



  export const userSignOut = createAsyncThunk(
    'user/signout',
    async (data, { rejectWithValue }) => {
      try{
        const response = await axiosClient.delete("/auth/signout");
        const jsonData = await response.data;
        return jsonData;
      }
      catch(err :unknown){
        return rejectWithValue((<{message:string}>err).message);
      }
      
    }
  );
//TODO: update user
