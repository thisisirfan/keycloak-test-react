import React, { ChangeEvent, useState } from 'react'
import JsonTreeViewer from './JsonTreeViewer';

interface resetPassword {
    email: string;
}
const ResetPasswordForm = () => {
    const API_URL: any = "https://idp.stg.nexi-international.com/realms/nexi/nexi-users/reset-pw";
    const [apiResponse, setApiResponse] = useState<any>(null);

    const [formDetail, setFormDetail] = useState<resetPassword>({
        email: "berta@beispiel.de"
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
            formDetail.email
        ) {

            fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDetail),
            })
            .then(response => {
                console.log("🚀 ~ file: RegisterForm.tsx:77 ~ handleSubmit ~ response:", response)
                response.json()
            })
            .then(data => {
            // Handle the response data
            console.log('Response from server:', data);
            setApiResponse(data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error:', error);
            setApiResponse(error);
            });
        }
    };
  return (
    <div className="container">
            <div className="row justify-content-center mt-5 ">
                <div className="col-md-9 border p-4">
                    <h2 className="text-center">Reset Password Form</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                onChange={(e) => handleChange(e)}
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter your Email"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={() => handleSubmit()}
                            className="btn btn-primary mr-2"
                        >
                            Reset Password
                        </button>

                    </form>
                    <JsonTreeViewer data={apiResponse} title="Api Response" />
                </div>
            </div>
        </div>
  )
}

export default ResetPasswordForm