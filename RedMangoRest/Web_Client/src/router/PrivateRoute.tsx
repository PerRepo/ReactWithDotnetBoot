import { lazy } from "react";
import { Navigate } from "react-router-dom";

const Layout = lazy(() => import("../components/layout/Layout"));
const Home = lazy(() => import("../pages/Home"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function PrivateRoutes() {
    return {
        element: <Layout />,
        children: [
            { path: "/", element: <Home /> },
            { path: "*", element: <NotFound /> },
        ],
    };
}
