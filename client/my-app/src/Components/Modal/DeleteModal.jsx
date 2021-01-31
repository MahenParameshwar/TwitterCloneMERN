import React, {useState} from 'react';
import {Button,Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../Styles/postForm.module.css'
import stylesPost from '../../Styles/post.module.css'
import {  makeDeletePostRequest } from '../../Redux/Posts/action';

function DeleteModal({handleClose,handleShow,show,setShow,post,userId}) {
    
    
    
    const dispatch = useDispatch();
    
    const token = localStorage.getItem("token")
    
    const handleDelete = ()=>{
        console.log("called")
            dispatch(makeDeletePostRequest({token,id:post._id}))
            setShow(false)
    }
    
  return (
    <>
      <Modal className={[styles.modal,stylesPost.modal]} show={show} onHide={handleClose}>
      
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" >Delete this Post?</h5>
                    <button type="button" className="close" onClick={handleClose} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                   
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose} >Close</button>
                    <button type="button" className="btn btn-primary" onClick={handleDelete}   >Delete</button>
                </div>
            </div>
      
      </Modal>
    </>
  )
}

export default DeleteModal;