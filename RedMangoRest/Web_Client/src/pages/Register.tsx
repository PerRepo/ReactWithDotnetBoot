import React, { useState } from "react";
import { SD_Role } from "../Utility/SD";
import { useRegisterMutation } from "../Api/authApi";
import { useNavigate } from "react-router-dom";
import { inputHelper, toastNotify } from "../Helper";
import { newApiResponse } from "../types";

type Props = {};

export default function Register({}: Props) {
    const [registerUser] = useRegisterMutation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
        userName: "",
        password: "",
        role: "",
        name: "",
    });

    const inputHandler = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const temp = inputHelper(e, userInput);
        setUserInput(temp);
    };

    async function handleSummit(
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> {
        event.preventDefault();
        setLoading(true);
        const res: newApiResponse = await registerUser({
            userName: userInput.userName,
            password: userInput.password,
            role: userInput.role,
            name: userInput.name,
        });

        if (res.data!) {
            toastNotify("Done");
            navigate("/login");
        } else if (res.error) {
            toastNotify(res.error?.data.errorMessages[0], "error");
        }

        setLoading(false);
    }

    return (
        <div className="container text-center">
            <form method="post" onSubmit={handleSummit}>
                <h1 className="mt-5">Register</h1>
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
                            type="text"
                            className="form-control"
                            placeholder="Enter Name"
                            name="name"
                            value={userInput.name}
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
                            onChange={inputHandler}
                            required
                        />
                    </div>
                    <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
                        <select
                            className="form-control form-select"
                            required
                            value={userInput.role}
                            name="role"
                            onChange={(
                                e: React.ChangeEvent<HTMLSelectElement>
                            ) => inputHandler(e)}>
                            <option value="">--Select Role--</option>
                            <option value={SD_Role.Customer}>Customer</option>
                            <option value={SD_Role.Admin}>Admin</option>
                        </select>
                    </div>
                </div>
                <div className="mt-5">
                    <button type="submit" className="btn btn-success">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
