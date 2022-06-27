import React, { createContext, useContext, useEffect, useState } from 'react'
import './App.css'
import ITodo from './interfaces/ITodo'
import { Box } from '@mui/system';
import MenuAppBar from './components/navbar/MenuAppBar';
import Input from './components/add-input/Input';
import TodoList from './components/todo-list/TodoList';
import { createTodos, getTodos, updateTodos } from './api/todoApi';
import IUser from './features/user/user.interface';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/signin/signin.page';
import SignUp from './pages/signup/signup.page';
import AuthLayout from './components/auth-layout/AuthLayout';
import Home from './pages/Home/Home';
import { userSignUp } from './api/userApi';
import ChatComponent from './pages/Chat/chat.component';
import ChatPage from './message/Chat';
import axios from 'axios';
import { useAppDispatch } from './app/hooks';
import SignIn from './pages/signin/signin.page';
// export const UserContext = createContext<{ user: IUser | null }>({ user: null });
// export const TodoContext = createContext({
//   handleDelete: (id: string) => { },
//   handleCompleted: (id: string) => { }, handleEdit: (id: string) => { }
// });
const GetTodo =()=>{

  // useEffect(()=>{
  //   const data = async()=>{
  //     const todos = await axios.get('http://localhost:5001/tasks', {withCredentials: true});
  //     console.log(todos);
  //     //return todos;
  //   }
  //   data();
  // }
  // );
  return <h1>Todo</h1>
}
function App() {
  // const userContext = useContext(UserContext);
  // const [user, setUser] = useState(userContext.user);
  // useEffect(()=>{
  //   const getUser = async()=>{
  //     try{
  //       const getUserFromToken = await getToken();
  //       console.log("token user:",getUserFromToken.data);
  //       setUser(getUserFromToken.data);
  //       userContext.user = getUserFromToken.data;
  //     }
  //     catch(err){
  //       console.log("err")
  //     }
  //   }
  //   getUser();
  // },[])
  // const handleLogin = (user: IUser)=>{
  //   setUser(user);
  // }
  // useEffect(()=>{
  //   const connect = async()=>{
  //    const res = await axios.post('http://localhost:5001/auth/signin',{
  //     username:"thanhxuan2",
  //     password:"Th@nhXu@n123"
  // },
  //   { withCredentials: true }
  // )
  // console.log('fake connect ok!');
  // console.log(res.headers);
  //   }
  //   connect();
  // },[])
  

  
  return (
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={user? <Home /> :<AuthLayout><Login handleLogin={handleLogin}/></AuthLayout>}></Route> */}
          <Route path="/" element={<GetTodo />}></Route>
          <Route path="/chat" element={ <ChatPage />}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/signin" element={<SignIn/>}></Route>
        </Routes>
      </BrowserRouter>
  )

}
export default App
