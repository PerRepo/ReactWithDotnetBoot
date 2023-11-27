import menuItemModel from "./menuItemModel";

interface ApiResponse<T> {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: any[];
    result: T[];
}

export type { menuItemModel, ApiResponse };
