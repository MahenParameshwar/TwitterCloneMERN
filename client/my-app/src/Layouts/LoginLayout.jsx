import React from 'react';
import '../Styles/login.css'
function LoginLayout(props) {
    return (
        <div className="backgroundColorBlue height_100vh padding_20t">
            <div className="wrapper">
                {props.children}
            </div>
        </div>
        
    );
}

export default LoginLayout;