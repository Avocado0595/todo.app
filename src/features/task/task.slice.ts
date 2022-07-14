import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import Task from './task.interface';
import {getTaskList} from './task.api';


export interface TaskState {
	taskList: Task[];
	isLoading: boolean;
	errMessage?: any;
}

const initialState: TaskState = { taskList: [], isLoading: false };

export const taskSlice = createSlice({
	name: 'task',
	initialState,
	reducers: {
		
	},
	extraReducers: (builder) => {
		builder.addCase(getTaskList.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(getTaskList.fulfilled, (state, action) => {
			state.isLoading = false;
			state.taskList = action.payload as Task[];
		});

		builder.addCase(getTaskList.rejected, (state, action) => {
			state.isLoading = false;
			state.errMessage = action.payload;
		});
		
	},
});

//export const { } = productSlice.actions;

export default taskSlice.reducer;