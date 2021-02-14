import { set } from 'mongoose';
import React, { useState } from 'react';
import styles from '../Styles/postForm.module.css'
import ImageUploadModal from './Modal/ImageUploadModal';

function ImageContainer({profilePic,showUploadPic}) {
   
    const [show, setShow] = useState(false);
    
    

    
    const handleClose = () => setShow(false);
    const handleShow = (e) => setShow(true);
   
    return (
        <div className={styles.userImageContainer}>
                <img src={profilePic} alt="profile pic"/>
                {
                    showUploadPic && (
                    <>
                    <button onClick={handleShow} className={styles.profilePictureButton}>
                        <i className="fas fa-camera" />
                    </button>
                    <ImageUploadModal show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} />
                    </>
                    )
                }
            </div>
    );
}

export default ImageContainer;