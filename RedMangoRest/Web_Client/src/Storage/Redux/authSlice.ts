import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiResponse, LoginRequest, LoginResponse, menuItemModel } from "../../types";

const initialState = {
    username: "",
    password: "",
}

export const authSlic = createSlice({
    name: "auth",
    initialState:initialState,
    reducers: {
        loginHandler: (state, action: PayloadAction<LoginRequest>) => {
            state.username = action.payload.username;
            state.password = action.payload.password;
        }
    },
});

export const { loginHandler } = authSlic.actions;
export const authReducer = authSlic.reducer;
