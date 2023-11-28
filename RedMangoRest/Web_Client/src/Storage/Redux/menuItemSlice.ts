import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiResponse, menuItemModel } from "../../types";

const initialState = {
    menuItem: [] as menuItemModel[],
}

export const menuItemSlice = createSlice({
    name: "menuItem",
    initialState:initialState,
    reducers: {
        setMenuItem: (state, action: PayloadAction<ApiResponse<menuItemModel[]>>) => {
            state.menuItem = action.payload.result; // payload is the data that is passed in the action
        },
    },
});

export const { setMenuItem } = menuItemSlice.actions;
export const menuItemReducer = menuItemSlice.reducer;
