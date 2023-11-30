import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { inputHelper } from "../Helper";
import { newApiResponse, userModel } from "../types";
import { useLoginMutation } from "../Api/authApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../Storage/Redux/userAuthSlice";
import { MainLoader } from "../components/Page/common";

type Props = {};

export default function Login({}: Props) {
    const [loginUser] = useLoginMutation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        userName: "",
        password: "",
        role: "",
        name: "",
    });
    const [error, setError] = useState<string>("");

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const temp = inputHelper(e, userInput);
        setUserInput(temp);
    };

    async function handleSummit(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        setLoading(true);
        const res: newApiResponse = await loginUser({
            username: userInput.userName,
            password: userInput.password,
        });

        if (res.data) {
            console.log(res.data);
            const { token } = res.data?.result;
            const { fullName, id, email, role }: userModel = jwtDecode(token);
            dispatch(setLoggedInUser({ fullName, id, email, role }));
            Cookies.set("usr", token, { expires: 1 / 24 });

            navigate("/");
        } else if (res.error) {
            console.log(res.error?.data.errorMessages[0]);
            setError(res.error?.data.errorMessages[0]);
        }

        setLoading(false);
    }

    return (
        <div className="container text-center">
            {loading && <MainLoader />}
            <form
                method="post"
                onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
                    handleSummit(e)
                }>
                <h1 className="mt-5">Login</h1>
                <div className="mt-5">
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter Username"
                            name="userName"
                            value={userInput.userName}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => inputHandler(e)}
                            required
                        />
                    </div>

                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            name="password"
                            value={userInput.password}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => inputHandler(e)}
                            required
                        />
                    </div>
                </div>

                <div className="mt-2">
                    {error && <p className=" text-danger">{error}</p>}
                    <button
                        type="submit"
                        className="btn btn-success"
                        style={{ width: "200px" }}>
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
