import React, { lazy } from "react";
import { Navigate } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));

export default function PublicRoute() {
    return [
        { path: "/", element: <Login /> },
        { path: "*", element: <Navigate to="/" replace={true} /> },
    ];
}
