import React from "react";
import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from "../components/Page/Payment";
import { OrderSummary } from "../components/Page/Order";

type Props = {};

export default function Payment({}: Props) {
    const {
        state: { apiResult, userInput },
    } = useLocation();
    console.log(apiResult);
    const stripePromise = loadStripe(
        "pk_test_51OFFSZHQcgsQesnw2wkhw7eutZgbj9AAc46susoULDm0J6Ly2485gM4zAG8yu4O0ig7pxmRA98ZbmeQ7nTj217Xu006cDvW4Jq"
    );

    const options = {
        // passing the client secret obtained from the server
        clientSecret: apiResult?.clientSecret,
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <div className=" container m-5 p-5">
                <div className="row">
                    <div className=" col-md-7">
                        <OrderSummary data={apiResult} userInput={userInput} />
                    </div>
                    <div className="col-md-4 offset-md-1">
                        <h3 className=" text-success">Payment</h3>
                        <div className="mt-5">
                            <PaymentForm />
                        </div>
                    </div>
                </div>
            </div>
        </Elements>
    );
}
