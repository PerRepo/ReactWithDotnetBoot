import menuItemModel from "./menuItemModel";
import cartItemModel from "./cartItemModel";
import shoppingCartModel from "./shoppingCartModel";
import userModel from "./userModel";
import newApiResponse from "./new-api-response";

interface ApiResponse<T> {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: any[];
    result: T;
}

interface OrderSummary  {
    id: number
    cartItems: Array<shoppingCartModel>
    orderTotal: number
}

interface OrderSummaryProps {
    data : OrderSummary
    userInput : {
        name: string;
        email: string;
        phoneNumber: string;
    }
}

export type { menuItemModel, ApiResponse, cartItemModel, shoppingCartModel, userModel, newApiResponse, OrderSummaryProps };
