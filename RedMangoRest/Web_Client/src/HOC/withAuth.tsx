import React from "react";
import { getToken } from "../Utility/Cookies";
import { Navigate, useNavigate } from "react-router-dom";

type Props = {};

export default function withAuth(WrappedComponent: any) {
    return (props: any) => {
        const accessToken = getToken("usr");
        if (!accessToken) {
            //window.location.replace("/login");
            return <Navigate to={"/login"} replace={true} />;
        }
        return <WrappedComponent {...props} />;
    };
}
