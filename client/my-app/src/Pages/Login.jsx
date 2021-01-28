import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginLayout from '../Layouts/LoginLayout';
import '../Styles/login.css'
function Login(props) {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    return (
        <LoginLayout>
            <div className="loginContainer">
                <h1>
                    login
                </h1>
                <form action="">
                    <input value={email} onChange={(event)=>setEmail(event.target.value)}
                     type="email" placeholder="Email" required/>
                    <input value={password} onChange={(event)=>setPassword(event.target.value)}
                    type="password" placeholder="Password" required/>
                    <input type="submit" value="Login"/>
                </form>
                <Link to="/register">
                    Need an account? Register here.
                </Link>
            </div>
        </LoginLayout>
    );
}

export default Login;