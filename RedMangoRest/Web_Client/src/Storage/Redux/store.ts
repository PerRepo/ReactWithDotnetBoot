import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import {menuItemApi} from "../../Api/index";

export const store = configureStore({
    reducer: {
        menuItem: menuItemReducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(menuItemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>; // this is the type of the state of the store

export default store; 
