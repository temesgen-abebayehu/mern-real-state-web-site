import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },  
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateUserStart: (state) =>{
            state.loading = true;
        },
        updateUserSuccess: (state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) =>{
            state.loading = true;
        },
        deleteUserSuccess: (state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        deleteUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logoutUserStart: (state) =>{
            state.loading = true;
        },
        logoutUserSuccess: (state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        logoutUserFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const { 
    loginStart, 
    loginSuccess, 
    loginFailure, 
    updateUserStart, 
    updateUserSuccess, 
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    logoutUserStart,
    logoutUserSuccess,
    logoutUserFailure
} = userSlice.actions;

export default userSlice.reducer;