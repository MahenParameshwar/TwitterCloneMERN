import React, {useState} from 'react';
import {Button,Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../Posts/PostForm';
import styles from '../../Styles/postForm.module.css'
import stylesPost from '../../Styles/post.module.css'
import ImageContainer from '../ImageContainer';
import Post from '../Posts/Post';
import { makeAddPostRequest } from '../../Redux/Posts/action';

function ReplyModal({handleClose,handleShow,show,setShow,post,userId}) {
    const [text,setText] = useState('');
    
    const {user} = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    
    const handleReply = ()=>{
        dispatch(makeAddPostRequest({token,content:text,postId:post._id}))
        setShow(false)
    }
    
  return (
    <>
      <Modal className={[styles.modal,stylesPost.modal]} show={show} onHide={handleClose}>
      
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" >Reply</h5>
                    <button type="button" className="close" onClick={handleClose} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="originalPostContainer">
                        <Post post={post} userId={userId} disabled={true}  />
                        
                    </div>
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
                        
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose} >Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleReply} disabled={text === ""}  >Reply</button>
                </div>
            </div>
      
      </Modal>
    </>
  )
}

export default ReplyModal;