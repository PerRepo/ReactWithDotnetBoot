import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { toastNotify } from "../../../Helper";

type Props = {};

export default function PaymentForm({}: Props) {
    const stripe = useStripe();
    const elements = useElements();
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setProcessing(true);
        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://example.com/order/123/complete",
            },
            redirect: "if_required",
        });

        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            toastNotify("An unexpected error occured", "error");
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
            console.log(result);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button className="btn btn-success mt-5 w-100">Submit</button>
        </form>
    );
}
