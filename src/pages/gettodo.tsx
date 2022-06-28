import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { selectCurrentUser } from "../features/user/user.slice";

const GetTodo =()=>{
    const currentUser = useAppSelector((state:RootState)=>selectCurrentUser(state));
    return <div>
      <h1>{currentUser?.username}</h1>
    </div>
  }
  export default GetTodo;