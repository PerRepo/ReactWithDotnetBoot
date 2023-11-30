import React from "react";
import { CartPickupDetail, CartSummary } from "../components/Page/cart";
import { withAuth } from "../HOC";
import { Link } from "react-router-dom";

type Props = {};

function ShoppinCart({}: Props) {
    return (
        <div className="row w-100" style={{ marginTop: "10px" }}>
            <div
                className="col-lg-6 col-12"
                style={{ fontWeight: 300, border: "1px red solid" }}>
                <CartSummary />
                <div
                    className=""
                    style={{
                        width: "80%",
                        margin: "0px auto",
                    }}>
                    <Link to={"/"} className="btn btn-secondary form-control">
                        Back to Home
                    </Link>
                </div>
            </div>

            <div className="col-lg-6 col-12 p-4 ">
                <CartPickupDetail />
            </div>
        </div>
    );
}

export default withAuth(ShoppinCart);
