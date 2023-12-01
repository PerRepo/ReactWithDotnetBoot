import React, { useState } from "react";
import { cartItemModel, newApiResponse } from "../../../types";
import { RootState } from "../../../Storage/Redux/store";
import { useSelector } from "react-redux";
import { inputHelper } from "../../../Helper";
import { MiniLoader } from "../common";
import { useInitialPaymentMutation } from "../../../Api/paymentApi";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function CartPickupDetail({}: Props) {
    const shoppingCartFromStore: cartItemModel[] = useSelector(
        (state: RootState) => state.shoppingCartStore.cartItems ?? []
    );

    const userData = useSelector((state: RootState) => state.userAuthStore);
    const navigate = useNavigate();

    const initailUserData = {
        name: userData.fullName ?? "",
        email: userData.email ?? "",
        phoneNumber: "",
    };

    const [userInput, setUserInput] = useState(initailUserData);
    const [loading, setLoading] = useState(false);

    const [initiatePayment] = useInitialPaymentMutation();

    let grandTotal = 0;
    let totalItems = 0;

    shoppingCartFromStore.map((item) => {
        grandTotal += (item.menuItem?.price ?? 0) * (item.quantity ?? 0);
        totalItems += item.quantity ?? 0;
        return null;
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, userInput);
        setUserInput(tempData);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const res = await initiatePayment(userData.id).unwrap();
        //const orderSummary = { grandTotal, totalItems };
        console.log(res?.result);
        navigate("/payment", {
            state: { apiResult: res?.result, userInput },
        });
    };

    return (
        <div className="border pb-5 pt-3">
            <h1
                style={{ fontWeight: "300" }}
                className="text-center text-success">
                Pickup Details
            </h1>
            <hr />
            <form onSubmit={handleSubmit} className="col-10 mx-auto">
                <div className="form-group mt-3">
                    Pickup Name
                    <input
                        type="text"
                        className="form-control"
                        placeholder="name..."
                        name="name"
                        value={userInput.name}
                        onChange={handleUserInput}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    Pickup Email
                    <input
                        type="email"
                        className="form-control"
                        placeholder="email..."
                        value={userInput.email}
                        onChange={handleUserInput}
                        name="email"
                        required
                    />
                </div>

                <div className="form-group mt-3">
                    Pickup Phone Number
                    <input
                        type="number"
                        className="form-control"
                        placeholder="phone number..."
                        name="phoneNumber"
                        value={userInput.phoneNumber}
                        onChange={handleUserInput}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <div
                        className="card p-3"
                        style={{ background: "ghostwhite" }}>
                        <h5>Grand Total : ${grandTotal.toFixed(2)}</h5>
                        <h5>No of items : {totalItems}</h5>
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-lg btn-success form-control mt-3"
                    disabled={loading}>
                    {loading ? <MiniLoader /> : "Looks Good? Place Order!"}
                </button>
            </form>
        </div>
    );
}
