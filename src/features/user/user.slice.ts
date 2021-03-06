import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from './user.interface';
import type { RootState } from '../../app/store';
import { userInit, userSignIn, userSignOut, userSignUp } from './user.api';

export interface UserState {
	currentUser: User | null,
	isLoading: boolean,
	errMessage?: string
}

const initialState: UserState = {
	currentUser: null,
	isLoading: false
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<User>) => {
			state.currentUser = action.payload;
		},
		clearCurrentUser: (state) => {
			state.currentUser = null;
		},
	},
	extraReducers: (builder) => {
        //
		builder.addCase(userSignUp.pending, (state) => {
		state.isLoading = true;
		});
	
		builder.addCase(userSignUp.fulfilled, (state, action) => {
		state.isLoading = false;
		state.currentUser = action.payload as User;
		});
		//
		builder.addCase(userSignUp.rejected, (state, action) => {
		state.isLoading = false;
		state.errMessage = action.payload as string;
		});

        //signin handle
		builder.addCase(userSignIn.pending, (state) => {
            state.isLoading = true;
            });
        
        builder.addCase(userSignIn.fulfilled, (state, action) => {
        state.isLoading = false;
		console.log(action.payload);
        state.currentUser = action.payload as User;
        });
    
        builder.addCase(userSignIn.rejected, (state, action) => {
        state.isLoading = false;
        state.errMessage = action.payload as string;
        });

		////signin handle
		builder.addCase(userInit.pending, (state) => {
            state.isLoading = true;
            });
        
        builder.addCase(userInit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload as User;
        });
    
        builder.addCase(userInit.rejected, (state, action) => {
        state.isLoading = false;
        state.errMessage = action.payload as string;
        });

		////signout handle
		builder.addCase(userSignOut.pending, (state) => {
            state.isLoading = true;
            });
        
        builder.addCase(userSignOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = null;
        });
    
        builder.addCase(userSignOut.rejected, (state, action) => {
        state.isLoading = false;
        state.errMessage = action.payload as string;
        });
	}
});

export const { setCurrentUser, clearCurrentUser } = userSlice.actions;

export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserLoadingState = (state: RootState)=>state.user.isLoading;
export default userSlice.reducer;
