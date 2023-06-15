import React, { ChangeEvent, useState } from 'react'
import JsonTreeViewer from './JsonTreeViewer';
interface loginDetails {
    baseurl: string;
    username: string;
    password: string;
    grant_type: string;
    client_id: string;
    // scope: string;
}


const LoginForm = () => {
    const [formDetail, setFormDetail] = useState<loginDetails>({
        baseurl: "",
        username: "",
        password: "",
        grant_type: "password",
        client_id: "nexi-app",
        // scope: "offline_access openid",

    })

    const [apiResponse, setApiResponse] = useState<any>(null)
    const [userInfo, setUserInfo] = useState<any>(null)

    const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setFormDetail({
            ...formDetail,
            [ev.target.name]: ev.target.value

        })
    }


    const handleSubmit = async () => {
        if (formDetail && formDetail.baseurl && formDetail.username && formDetail.password) {
            try {
                const {
                    baseurl,
                    ...otherprops
                } = formDetail
                    console.log("🚀 ~ file: LoginForm.tsx:42 ~ handleSubmit ~ otherprops:", otherprops)
                    const formData = new URLSearchParams();

                    for (const [key, value] of Object.entries(otherprops)) {
                      formData.append(key, value);
                    }
                const response: any = await fetch(baseurl.endsWith('/') ? baseurl + "token" : baseurl + "/token", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData.toString()
                });

                console.log("🚀 ~ file: LoginForm.tsx:47 ~ handleSubmit ~ response:", response)
                const json = await response.json();
                setApiResponse(json)

            } catch (error) {
                console.log('Error:', error);
            }
        }
    }

    const handleUserInfo = async () => {
        try {
            const { baseurl } = formDetail
            const response = await fetch(baseurl.endsWith('/') ? baseurl + "userinfo" : baseurl + "/userinfo", {
                headers: {
                    'Authorization': "Bearer " + apiResponse?.access_token
                }
            });
            console.log("🚀 ~ file: LoginForm.tsx:75 ~ response ~ response:", response)
            const json = await response.json();
            console.log("🚀 ~ file: LoginForm.tsx:77 ~ handleUserInfo ~ json:", json)
            setUserInfo(json)
        } catch (error) {
            console.log('Error:', error);
        }
    }

    const handleLogout = async () => {
        try {
            const { baseurl } = formDetail
            const response = await fetch(baseurl.endsWith('/') ? baseurl + "logout" : baseurl + "/logout", {
                headers: {
                    'Authorization': 'Bearer your_token_here' // Replace with your actual token
                }
            });
            setUserInfo(response)
        } catch (error) {
            console.log('Error:', error);
        }
    }


    return (
        <div className="container">
            <div className="row justify-content-center mt-5 ">
                <div className="col-md-8 border p-4">
                    <h2 className="text-center">Login Form</h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Base URL</label>
                            <input onChange={(e) => handleChange(e)} name="baseurl" type="text" className="form-control" id="baseurl" placeholder="Enter your base url" />
                            <small>i.e: <i>https://idp.stg.nexi-international.com/realms/nexi/protocol/openid-connect/</i></small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input onChange={(e) => handleChange(e)} type="text" className="form-control" id="username" name="username" placeholder="Enter your username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => handleChange(e)} type="password" className="form-control" id="password" name="password" placeholder="Enter your password" />
                        </div>
                        <button type="button" onClick={() => handleSubmit()} className="btn btn-primary mr-2">Login</button>
                        {apiResponse && (
                            <>
                                <button type="button" onClick={() => handleUserInfo()} className="btn btn-success mr-2">User Info</button>
                                <button type="button" onClick={() => handleLogout()} className="btn btn-danger mr-2">Logout</button>
                            </>
                        )}
                    </form>
                    <JsonTreeViewer data={apiResponse} title='Api Response'/>
                    <JsonTreeViewer data={userInfo} title='User Info'/>
                </div>
            </div>
        </div>
    )
}

export default LoginForm