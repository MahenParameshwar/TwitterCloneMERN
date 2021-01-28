import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginLayout from '../Layouts/LoginLayout';
import '../Styles/login.css'

function Register(props) {
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [userName,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    return (
        <LoginLayout>
            <div className="loginContainer">
                <h1>
                    Register
                </h1>
                <form action="">
                    <input value={firstName} onChange={(event)=>setFirstName(event.target.value)}
                     type="text" placeholder="First Name" required/>
                     <input value={lastName} onChange={(event)=>setLastName(event.target.value)}
                     type="text" placeholder="Last Name" required/>
                    <input value={userName} onChange={(event)=>setUserName(event.target.value)}
                     type="text" placeholder="Username" required/>
                    <input value={email} onChange={(event)=>setEmail(event.target.value)}
                     type="email" placeholder="Email" required/>
                    <input value={password} onChange={(event)=>setPassword(event.target.value)}
                    type="password" placeholder="Password" required/>
                    <input type="submit" value="Register"/>
                </form>
                <Link to="/login">
                    Already have an account? Login here.
                </Link>
            </div>
        </LoginLayout>
    );
}

export default Register;
