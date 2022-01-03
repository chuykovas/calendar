import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice(
    {
        name: 'auth',
        initialState: {
            email: null,
            isLoading: false
        },
        reducers:{
            login(state, action){
                const { email } = action.payload;
                state.email = email;
            },
            logout(state){
                localStorage.removeItem('userData');
                state.email = null;
            },
            startLoading(state){
                state.isLoading = true;
            },
            stopLoading(state){
                state.isLoading = false;
            }
        }
    }
)

export const {login, logout, startLoading, stopLoading} = authSlice.actions
export const auth = authSlice.reducer