import React, { useState } from 'react';
import styles from '../Styles/profile.module.css'
import ImageUploadModal from './Modal/ImageUploadModal';

function ProfileImageContainer({profilePic,showUploadPic}) {
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
                    <ImageUploadModal title={"Upload new profile pic"} show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} />
                    </>
                    )
                }
            </div>
    );
}

export default ProfileImageContainer;



