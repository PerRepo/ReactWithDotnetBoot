import React from "react";
import { getToken } from "../Utility/Cookies";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { SD_Role } from "../Utility/SD";

type Props = {};

export default function withAdminAuth(WrappedComponent: any) {
    return (props: any) => {
        const accessToken = getToken("usr") ?? "";
        if (accessToken) {
            const decode: {
                role: string;
            } = jwtDecode(accessToken);

            if (decode.role !== SD_Role.Admin) {
                return <Navigate to={"/"} replace={true} />;
            }
        } else {
            return <Navigate to={"/login"} replace={true} />;
        }

        return <WrappedComponent {...props} />;
    };
}
