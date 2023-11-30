import React from "react";
import { CartPickupDetail, CartSummary } from "../components/Page/cart";
import { withAuth } from "../HOC";

type Props = {};

function ShoppinCart({}: Props) {
    return (
        <div className="row w-100" style={{ marginTop: "10px" }}>
            <div className="col-lg-6 col-12" style={{ fontWeight: 300 }}>
                <CartSummary />
            </div>
            <div className="col-lg-6 col-12 p-4 ">
                <CartPickupDetail />
            </div>
        </div>
    );
}

export default withAuth(ShoppinCart);
