import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { ApiResponse, menuItemModel } from "../types";

const menuItemApi = createApi({
    reducerPath: "menuItemApi",
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
    tagTypes: ["MenuItems"],
    endpoints: (builder) => ({
        getMenuItem: builder.query<ApiResponse<menuItemModel[]>, any>({
            query: () => ({
                url: "MenuItem",
            }),
            providesTags: ["MenuItems"]
        }) ,
        getMenuItemById: builder.query<ApiResponse<menuItemModel>, any>({
            query: (id) => ({
                url: `MenuItem/${id}`,
            }),
            providesTags: ["MenuItems"]
        })
    })
});

export const {useGetMenuItemQuery, useGetMenuItemByIdQuery} =  menuItemApi;
export default menuItemApi;
