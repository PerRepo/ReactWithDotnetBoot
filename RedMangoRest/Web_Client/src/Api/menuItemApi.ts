import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { ApiResponse, menuItemModel } from "../types";

const menuItemApi = createApi({
    reducerPath: "menuItemApi",
    baseQuery: fetchBaseQuery({
        prepareHeaders: (headers) => {
            const token: string =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmdWxsTmFtZSI6InBlciIsImlkIjoiNGM4NWVmODMtMzk2Ny00MmU4LTljM2MtNDZlYmVjOGMzMmYyIiwiZW1haWwiOiJwZXJAbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJuYmYiOjE3MDEyNjgxMDAsImV4cCI6MTcwMTM1NDUwMCwiaWF0IjoxNzAxMjY4MTAwfQ.Oa0oK5p7bV8FXIQkYlJDoA7Ar3WhifAgM7_xgr8jo34";
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
