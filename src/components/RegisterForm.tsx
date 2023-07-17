import React, { ChangeEvent, useState } from "react";
import JsonTreeViewer from "./JsonTreeViewer";

interface loginDetails {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    locale: string;
}

const RegisterForm = () => {
    const API_URL: any = "https://idp.stg.nexi-international.com/realms/nexi/nexi-users/create";
    const [apiResponse, setApiResponse] = useState<any>(null);

    const [formDetail, setFormDetail] = useState<loginDetails>({
        email: "berta@beispiel.de",
        password: "TopSecretPW11!",
        firstName: "Berta",
        lastName: "Beispiel",
        locale: "de"
    });
    
    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setFormDetail({
            ...formDetail,
            [ev.target.name]: ev.target.value,
        });
        
        console.log("🚀 ~ file: RegisterForm.tsx:23 ~ RegisterForm ~ formDetail:", formDetail)
    };

    const handleSubmit = async () => {
        if (
            formDetail &&
            formDetail.email &&
            formDetail.password &&
            formDetail.firstName &&
            formDetail.lastName &&
            formDetail.locale
        ) {
            // try {
                // const formData = new URLSearchParams();

                // for (const [key, value] of Object.entries(formDetail)) {
                //     formData.append(key, value);
                // }
            //     const response: any = await fetch(
            //         API_URL,
            //         {
            //             method: "POST",
            //             headers: {
            //                 "Content-Type": "application/json",
            //             },
            //             body: formDetail.toString(),
            //         }
            //     );

            //     console.log(
            //         "🚀 ~ file: LoginForm.tsx:47 ~ handleSubmit ~ response:",
            //         response
            //     );
            //     const json = await response.json();
            //     setApiResponse(json);
            // } catch (error) {
            //     console.log("Error:", error);
            // }

            fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDetail),
            })
            .then(response => response.json())
            .then(data => {
            // Handle the response data
            console.log('Response from server:', data);
            setApiResponse(data);
            })
            .catch(error => {
            // Handle errors
            console.error('Error:', error);
            });
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5 ">
                <div className="col-md-12 border p-4">
                    <h2 className="text-center">Register Form</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={(e) => handleChange(e)}
                                type="text"
                                className="form-control"
                                id="username"
                                name="email"
                                placeholder="Enter your Email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                onChange={(e) => handleChange(e)}
                                type="text"
                                className="form-control"
                                id="username"
                                name="password"
                                placeholder="Enter your Password"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">FirstName</label>
                            <input
                                onChange={(e) => handleChange(e)}
                                type="text"
                                className="form-control"
                                id="username"
                                name="firstName"
                                placeholder="Enter your FirstName"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="LastName">LastName</label>
                            <input
                                onChange={(e) => handleChange(e)}
                                type="text"
                                className="form-control"
                                id="username"
                                name="lastName"
                                placeholder="Enter your LastName"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="locale">Locale</label>
                            <input
                                onChange={(e) => handleChange(e)}
                                type="text"
                                className="form-control"
                                id="username"
                                name="locale"
                                placeholder="Enter your Locale"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => handleSubmit()}
                            className="btn btn-primary mr-2"
                        >
                            Register
                        </button>

                    </form>
                    <JsonTreeViewer data={apiResponse} title="Api Response" />
                </div>
            </div>
        </div>
    )
}

export default RegisterForm