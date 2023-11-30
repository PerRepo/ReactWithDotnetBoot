import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { ApiResponse, cartItemModel, shoppingCartModel } from "../types";

// userId = 4c85ef83-3967-42e8-9c3c-46ebec8c32f2

type ShoppingCartParams = {
    userId: string
    menuItemId: number,
    updateQuantityBy: number
}

const shoppingCartApi = createApi({
    reducerPath: "shoppingCartApi",
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers) => {
            const token: string =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6InBlciIsImlkIjoiNGM4NWVmODMtMzk2Ny00MmU4LTljM2MtNDZlYmVjOGMzMmYyIiwiZW1haWwiOiJwZXJAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE3MDExNzA2NzcsImV4cCI6MTcwMTI1NzA3NywiaWF0IjoxNzAxMTcwNjc3fQ.r0A0sPWem7LULyMNLcmUUyM3KGIxFfI6Ysqwh-PW1ZU";
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
            return headers;
        },
        baseUrl: "https://redmengorestapi.azurewebsites.net/api/"
    }),
    tagTypes: ["ShoppingCarts"],
    endpoints: (builder) => ({
        getShoppingCart: builder.query<ApiResponse<shoppingCartModel>, any>({
            query: (userId) => ({
                url: `ShoppingCart`,
                params: {
                    userId: userId
                }
            }),
            providesTags: ["ShoppingCarts"]
        }),
        updateShoppoingCart: builder.mutation<ApiResponse<cartItemModel[]>, ShoppingCartParams>({
            query: ({userId, menuItemId, updateQuantityBy}) => ({
                url: `ShoppingCart`,
                method: "POST",
                params: {
                    userId: userId,
                    menuItemId: menuItemId,
                    updateQuantityBy: updateQuantityBy
                }
            }),
            invalidatesTags: ["ShoppingCarts"]
        })
    })
});

export const {useGetShoppingCartQuery, useUpdateShoppoingCartMutation } =  shoppingCartApi;
export default shoppingCartApi;
