import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { ApiResponse, LoginRequest, LoginResponse } from "../types";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://redmengorestapi.azurewebsites.net/api/Auth"
    }),
    tagTypes: ["Authentications"],
    endpoints: (builder) => ({
        login: builder.query<ApiResponse<LoginResponse>, any>({
            query: () => ({
                url: "login",
            }),
            providesTags: ["Authentications"]
        }) ,
    })
});

export const {useLoginQuery} =  authApi;
export default authApi;
