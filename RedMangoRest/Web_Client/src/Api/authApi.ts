import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

// userId = 4c85ef83-3967-42e8-9c3c-46ebec8c32f2

type ShoppingCartParams = {
    userId: string
    menuItemId: number,
    updateQuantityBy: number
}

type registerParams = {
    userName: string
    password: string
    role: string
    name: string
}

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://redmengorestapi.azurewebsites.net/api/"
    }),
    endpoints: (builder) => ({
        register: builder.mutation<any, registerParams>({
            query: (userData) => ({
                url: `Auth/register`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: userData
            }),
            
        }),
        login : builder.mutation<any, {username:string, password:string}>({
            query: (userData) => ({
                url: `Auth/login`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: userData 
            })
        })
    })
});

export const {useRegisterMutation, useLoginMutation } =  authApi;
export default authApi;
