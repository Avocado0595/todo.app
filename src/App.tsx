import React, { createContext, Suspense, useContext, useEffect, useState } from 'react'
import './App.css'
import ITodo from './features/task/task.interface'
import { Box } from '@mui/system';
import MenuAppBar from './components/navbar/MenuAppBar';
import Input from './components/add-input/Input';
import TodoList from './components/todo-list/TodoList';
//import { createTodos, getTodos, updateTodos } from './features/task/task.api';
import IUser from './features/user/user.interface';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/signin/signin.page';
import SignUp from './pages/signup/signup.page';
import AuthLayout from './components/auth-layout/AuthLayout';
import Home from './pages/home/home.page';
import { userInit, userSignUp } from './features/user/user.api';
import ChatComponent from './pages/Chat/chat.component';
import ChatPage from './message/Chat';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './app/hooks';
import SignIn from './pages/signin/signin.page';
import { RootState } from './app/store';
import { selectCurrentUser } from './features/user/user.slice';
import { getTaskList } from './features/task/task.api';

//const GetTodo = React.lazy(() => import("./pages/gettodo"));
function App() {
  const currentUser = true;//useAppSelector((state:RootState)=>selectCurrentUser(state));
  const dispatch = useAppDispatch();
  // useEffect(()=>{
  //   dispatch(userInit());
  //   dispatch(getTaskList());
  // },[dispatch])
  

  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ currentUser?<Home />: <Navigate to="signin"/>}></Route>
          <Route path="/signup" element={currentUser?<Navigate to="/"/>:<SignUp/>}></Route>
          <Route path="/signin" element={currentUser?<Navigate to="/"/>:<SignIn/>}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  
  )
}
export default App
