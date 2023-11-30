import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { ApiResponse, menuItemModel } from "../types";
import { getToken } from "../Utility/Cookies";


const menuItemApi = createApi({
    reducerPath: "menuItemApi",
    baseQuery: fetchBaseQuery({
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
