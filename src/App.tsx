import React, { createContext, Suspense, useContext, useEffect, useState } from 'react'
import './App.css'
import ITodo from './interfaces/ITodo'
import { Box } from '@mui/system';
import MenuAppBar from './components/navbar/MenuAppBar';
import Input from './components/add-input/Input';
import TodoList from './components/todo-list/TodoList';
import { createTodos, getTodos, updateTodos } from './api/todoApi';
import IUser from './features/user/user.interface';
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './pages/signin/signin.page';
import SignUp from './pages/signup/signup.page';
import AuthLayout from './components/auth-layout/AuthLayout';
import Home from './pages/Home/Home';
import { userInit, userSignUp } from './api/userApi';
import ChatComponent from './pages/Chat/chat.component';
import ChatPage from './message/Chat';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from './app/hooks';
import SignIn from './pages/signin/signin.page';
import { RootState } from './app/store';
import { selectCurrentUser } from './features/user/user.slice';
//import GetTodo from './pages/gettodo';
// export const UserContext = createContext<{ user: IUser | null }>({ user: null });
// export const TodoContext = createContext({
//   handleDelete: (id: string) => { },
//   handleCompleted: (id: string) => { }, handleEdit: (id: string) => { }
// });
const GetTodo = React.lazy(() => import("./pages/gettodo"));
function App() {
  const userState = useAppSelector((state:RootState)=>state.user);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    dispatch(userInit());
  },[dispatch])
 
  return (
    <Suspense fallback={<h1>loading...</h1>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ userState?<GetTodo />: <Navigate to="signin"/>}></Route>
          {/* <Route path="/chat" element={ <ChatPage/>}></Route> */}
          <Route path="/signup" element={!userState?<SignUp/>:<Navigate to="/"/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  
  )
}
export default App
