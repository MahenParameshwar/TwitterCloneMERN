import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import styles from '../Styles/main.module.css'

function MainLayout(props) {
    return (
        <div className='wrapper'>
            <div className="row">
                <Navbar styles={styles} />
                <div className={`${styles.mainSectionContainer} col-10 col-md-8 col-lg-6`}>
                    <div className={styles.titleContainer}>
                        <h1>Home</h1>
                    </div>
                    {
                        props.children
                    }
                </div>
                <div className="col-2 d-none d-md-block col-lg-4">
                    Third column
                </div>
            </div>
        </div>
    );
}

export default MainLayout;