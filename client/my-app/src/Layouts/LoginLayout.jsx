import React from 'react';
import styles from '../Styles/login.module.css'
function LoginLayout(props) {
    return (
        <div className={[styles.backgroundColorBlue,styles.padding_20t,styles.height_100vh].join(' ')}>
            <div className={styles.wrapper}>
                {props.children}
            </div>
        </div>
        
    );
}

export default LoginLayout;