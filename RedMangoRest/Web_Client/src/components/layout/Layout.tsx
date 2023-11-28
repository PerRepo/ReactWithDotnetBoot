import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./index";

type Props = {};

export default function Layout({}: Props) {
    return (
        <>
            <Header />
            <Suspense>
                <div className=" pb-5">
                    <Outlet />
                </div>
            </Suspense>
            <Footer />
        </>
    );
}
