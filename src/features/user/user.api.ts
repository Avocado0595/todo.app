import { IResponse } from "../../interfaces/IResponse";
import { UserAuth, UserSignUp } from "../../interfaces/user-auth.interface";
import axiosClient  from "../../api/axiosClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userSignUp = createAsyncThunk(
    'user/signup',
    async (user:UserSignUp, { rejectWithValue }) => {
      try{
        const response = await axiosClient.post("/auth/signup", user);
        const jsonData = await response.data;
        return jsonData;
      }
      catch(err){
        console.log(err);
          if((err as string).includes('409'))
            return rejectWithValue('User name is already exist.');
          return rejectWithValue('Error on sign up. Please try again.');
        
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
      catch(err){
        return rejectWithValue('Invalid user name or password.');
      }
    }
  );

  export const userInit = createAsyncThunk(
    'user/init',
    async (data, { rejectWithValue }) => {
        try{
          const res = await axiosClient.get("/auth")
          return await res.data;
        }
        catch(err){
          rejectWithValue(null);
        }
    }
  );

  export const userSignOut = createAsyncThunk(
    'user/signout',
    async (data, { rejectWithValue }) => {
      const response = await axiosClient.delete("/auth/signout");
      const jsonData = await response.data;
      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(jsonData);
      }
      return jsonData;
    }
  );
//TODO: update user
