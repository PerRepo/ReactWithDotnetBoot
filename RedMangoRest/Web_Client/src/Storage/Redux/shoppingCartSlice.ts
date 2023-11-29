import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ApiResponse, cartItemModel, menuItemModel, shoppingCartModel } from "../../types";

const initialState : shoppingCartModel = {
    cartItems: [],
}

export const shoppingCartSlice = createSlice({
    name: "cartItem",
    initialState:initialState,
    reducers: {
        setShoppingCart: (state, action: PayloadAction<cartItemModel[]>) => {
            state.cartItems = action.payload; // payload is the data that is passed in the action
        },
        updateQuantity: (state, action:PayloadAction<{cartItem:cartItemModel, quantity:number}>) => {
            // payload - cartItem that needs to be update, newquantity
            state.cartItems = state.cartItems?.map((item:cartItemModel) => {
                if (item.id === action.payload.cartItem.id) {
                    item.quantity = action.payload.quantity;
                }
                return item;
            })
        },
        removeFromCart: (state, action: PayloadAction<{cartItem:cartItemModel, quantity:number}>) => {
            // payload - cartItem that needs to be update, newquantity
            state.cartItems = state.cartItems?.filter((item:cartItemModel) => {
                if (item.id === action.payload.cartItem.id) {
                    return null;
                }
                return item;
            })
        }
    },
});

export const { setShoppingCart, updateQuantity, removeFromCart } = shoppingCartSlice.actions;
export const shoppingCartReducer = shoppingCartSlice.reducer;
