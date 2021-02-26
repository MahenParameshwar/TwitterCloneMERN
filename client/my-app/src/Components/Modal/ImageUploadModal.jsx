import React, {useState} from 'react';
import {Button,Modal} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../Styles/postForm.module.css'
import stylesPost from '../../Styles/post.module.css'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { makeUploadProfilePicRequest } from '../../Redux/User/action';

function ImageUploadModal({handleClose,handleShow,show,setShow,title,isCoverPic=false}) {
const [image, setImage] = useState("");
//   const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState();
  const token = localStorage.getItem("token")
  const dispatch = useDispatch();
  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    
    if (typeof cropper !== "undefined") {
        if(cropper.getCroppedCanvas()){
            console.log(cropper.getCroppedCanvas().toDataURL())
            dispatch(makeUploadProfilePicRequest({token,profilePic:cropper.getCroppedCanvas().toDataURL(),isCoverPic}))
            handleClose();
        }
        else{
            alert('Please Upload a picture')
        }
      
    }
    else{
        alert('Please Upload a picture')
    }
  };
    
    
    
    
  
    
    const handleUpload = ()=>{
       
    }
    
  return (
    <>
      <Modal className={[styles.modal,stylesPost.modal]} show={show} onHide={handleClose}>
      
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" >{title}</h5>
                    <button type="button" className="close" onClick={handleClose} data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <input type="file" onChange={onChange} />
                <Cropper
                    style={{ height: 400, width: "100%" }}
                    initialAspectRatio={1}
                    preview=".img-preview"
                    src={image}
                    viewMode={1}
                    guides={true}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    responsive={true}
                    autoCropArea={1}
                    checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    onInitialized={(instance) => {
                        setCropper(instance);
                    }}
                />
       
        
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleClose} >Close</button>
                    <button type="button" className="btn btn-primary"  onClick={getCropData}>Save</button>
                </div>
            </div>
      
      </Modal>
    </>
  )
}

export default ImageUploadModal;

