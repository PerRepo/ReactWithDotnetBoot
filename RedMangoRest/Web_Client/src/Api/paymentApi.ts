import { initialState } from './../Storage/Redux/userAuthSlice';
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { ApiResponse, cartItemModel } from "../types";
import { getToken } from "../Utility/Cookies";

type paymentModel = {
    id: number
    userId: string
    cartItems: Array<cartItemModel>
    orderTotal: number
    stripePaymentIntentId: string
    clientSecret: string
}

const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://redmengorestapi.azurewebsites.net/api/"
    }),
    tagTypes: ["MenuItems"],
    endpoints: (builder) => ({
        initialPayment: builder.mutation<ApiResponse<paymentModel>, string>({
            query: (userId) => ({
                url: "Payment",
                method: "POST",
                params: {
                    userId: userId
                }
            }),
        
        }) 
    })
});

export const {useInitialPaymentMutation} =  paymentApi;
export default paymentApi;
