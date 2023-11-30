import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiResponse, menuItemModel, userModel } from "../../types";

export const initialState : userModel = {
    id: "",
    email: "",
    fullName: "",
    role: "",
}

export const userAuthSlice = createSlice({
    name: "userAuth",
    initialState:initialState,
    reducers: {
        setLoggedInUser: (state, action: PayloadAction<userModel>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.role = action.payload.role;
        },
    },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
