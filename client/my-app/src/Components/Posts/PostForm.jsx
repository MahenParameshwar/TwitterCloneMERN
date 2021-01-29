import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeAddPostRequest } from '../../Redux/Posts/action';
import styles from '../../Styles/postForm.module.css'
import ImageContainer from '../ImageContainer';

function PostForm(props) {
    const [text,setText] = useState('');
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.user);
    
    const submitPost = ()=>{
        const token = localStorage.getItem("token");
        dispatch(makeAddPostRequest({token,content:text}));
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
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostForm;