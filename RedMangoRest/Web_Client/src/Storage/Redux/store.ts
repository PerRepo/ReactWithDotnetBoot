import { userAuthReducer } from './userAuthSlice';
import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItemSlice";
import {authApi, menuItemApi, shoppingCartApi} from "../../Api/index";
import { shoppingCartReducer } from "./shoppingCartSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        menuItem: menuItemReducer,
        shoppingCartStore: shoppingCartReducer,
        userAuthStore: userAuthReducer,
        [menuItemApi.reducerPath]: menuItemApi.reducer,
        [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
                                            .concat(menuItemApi.middleware)
                                            .concat(shoppingCartApi.middleware)
                                            .concat(authApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>; // this is the type of the state of the store
export type AppDispatch = typeof store.dispatch; // this is the type of the dispatch function
export const useAppDispatch = () => useDispatch<AppDispatch>(); // this is the type of the dispatch function
export default store; 
