import { combineReducers } from '@reduxjs/toolkit';
import userSlice from '../features/user/user.slice';
// const persistConfig = {
// 	key: 'root',
// 	version: 1,
// 	storage,
// 	whitelist: ['cart']
//}

const rootReducer = combineReducers({
	user: userSlice,
});

export default rootReducer;
