import menuItemModel from "./menuItemModel";
import {LoginRequest, LoginResponse} from "./authModel";

interface ApiResponse<T> {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: any[];
    result: T;
}

export type { menuItemModel, ApiResponse, LoginRequest, LoginResponse };
