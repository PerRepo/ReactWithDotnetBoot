import menuItemModel from "./menuItemModel";
import cartItemModel from "./cartItemModel";
import shoppingCartModel from "./shoppingCartModel";

interface ApiResponse<T> {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: any[];
    result: T;
}

export type { menuItemModel, ApiResponse, cartItemModel, shoppingCartModel };
