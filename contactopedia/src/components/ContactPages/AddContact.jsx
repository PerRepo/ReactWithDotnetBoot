import React, { useState } from 'react'

export default function AddContact({ handleAddContact }) {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");


    const handleAddContactFormSubmit = (e) => {
        e.preventDefault();
        const name = e.target.elements.contactName.value.trim();
        const email = e.target.elements.contactEmail.value.trim();
        const phone = e.target.elements.contactPhone.value.trim();
        //console.log(name, email, phone);
        const response = handleAddContact({
            name: name,
            email: email,
            phone: phone,
        });

        if (response.status == "success") {
            setErrorMessage(undefined);
            setSuccessMessage(response.msg);
            document.querySelector(".contact-form").reset();
        } else {
            setErrorMessage(response.msg);
            setSuccessMessage(undefined);
        }

    };

    return (
        <div className="border row text-white p-2">
            <form onSubmit={(e) => handleAddContactFormSubmit(e)}>
                <div className='row p-2'>
                    <div className="col-12 text-white-50">Add a new Contact</div>
                    <div className="col-12 col-md-4 p-1">
                        <input
                            className="form-control form-control-sm"
                            placeholder="Name..."
                            name="contactName"
                        ></input>
                    </div>
                    <div className="col-12 col-md-4 p-1">
                        <input
                            className="form-control form-control-sm"
                            placeholder="Email..."
                            name="contactEmail"
                        ></input>
                    </div>
                    <div className="col-12 col-md-4 p-1">
                        <input
                            className="form-control form-control-sm"
                            placeholder="Phone..."
                            name="contactPhone"
                        ></input>
                    </div>
                    <div className="col-12 col-md-6 offset-md-3 p-1">
                        <button className="btn btn-primary btn-sm form-control">Create</button>
                    </div>
                </div>
            </form>
        </div>

    )
}
