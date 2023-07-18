import React, { useState } from 'react'
import LoginForm from './LoginForm'
import ResetPasswordForm from './ResetPasswordForm'
import RegisterForm from './RegisterForm'

const AuthContainer = () => {
    const [selectedForm, setSelectedForm] = useState<any>(null);
    return (
        <div>
          <div className="myButtons text-center">
          <button className="btn btn-primary btn-login" style={{ margin: '10px' }} onClick={() => setSelectedForm("login")}>
          Login
        </button>
        <button className="btn btn-secondary btn-getuser" style={{ margin: '10px' }} onClick={() => setSelectedForm("register")}>
          Register
        </button>
        <button className="btn btn-warning btn-getapi" style={{ margin: '10px' }} onClick={() => setSelectedForm("reset")}>
          Reset
        </button>
          </div>
        {/* <div className='row'> */}
        {/* <div className="col-6"> */}
        {selectedForm == "login" && <LoginForm />}
        {selectedForm == "reset" && <ResetPasswordForm />}
        {/* </div> */}
        {/* <div className="col-6"> */}
        {selectedForm == "register" && <RegisterForm />}
        {/* </div> */}
        {/* </div> */}
    </div>
    )
}

export default AuthContainer