import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeAddPostRequest } from '../../Redux/Posts/action';
import styles from '../../Styles/postForm.module.css'
import ImageContainer from '../ImageContainer';
import classNames from 'classnames'
import ImageUploadModal from '../Modal/ImageUploadModal';
function PostForm(props) {
    const [text,setText] = useState('');
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user);
    const [tweetPic,setTweetPic] = useState("")
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => setShow(true);

    const submitPost = ()=>{
        const token = localStorage.getItem("token");
        dispatch(makeAddPostRequest({token,content:text,tweetPic}));
        setText("")
    }
    return (
        <div className={styles.postFormContainer}>
            {
                user ? <ImageContainer profilePic={user.profilePic} /> : <></>
            }
           
            <div className={styles.textareaContainer}>
                <textarea name="" 
                id="postTextarea" 
                placeholder="What's Happening?"
                value={text}
                onChange={(e)=>setText(e.target.value)}
                ></textarea>
                <div className={styles.buttonContainer}>
                    <button onClick={submitPost} style={{outline:"none"}} className={styles.submitPostButton} disabled={text === ''}>
                        Tweet
                    </button>
                    <button  onClick={handleShow}  className={classNames(styles.submitPostButton)} >
                        Pic
                    </button>
                </div>
            </div>
            
            <ImageUploadModal title={"Upload Tweet Pic"} isTweetPic={true} isCoverPic={true}
             show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow}
             setTweetPic={setTweetPic} />
        </div>
    );
}

export default PostForm;