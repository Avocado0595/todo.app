import { combineReducers } from '@reduxjs/toolkit';
import taskSlice from '../features/task/task.slice';
import userSlice from '../features/user/user.slice';
// const persistConfig = {
// 	key: 'root',
// 	version: 1,
// 	storage,
// 	whitelist: ['cart']
//}

const rootReducer = combineReducers({
	user: userSlice,
	task: taskSlice
});

export default rootReducer;
