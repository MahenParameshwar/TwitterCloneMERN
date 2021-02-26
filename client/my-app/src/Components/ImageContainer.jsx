import React, { useState } from 'react';
import styles from '../Styles/postForm.module.css'


function ImageContainer({profilePic}) {
   
   
    return (
        <div className={styles.userImageContainer}>
                <img src={profilePic} alt="profile pic"/>
            </div>
    );
}

export default ImageContainer;