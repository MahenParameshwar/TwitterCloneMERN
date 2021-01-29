import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../Styles/postContainer.module.css'
import Post from './Post';
import axios from 'axios';
import {getPostsSuccess} from '../../Redux/Posts/action'
function PostContainer(props) {
    const {posts} = useSelector(state=>state.posts)
    const {user} = useSelector(state=>state.user)
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
    
    const handleLike = (id)=>{
        
        axios.put(`${process.env.REACT_APP_SERVER_URL}/api/auth/post/${id}/like`,{},{
            headers:{
                Authorization: `bearer ${token}`,
            }
        })
        .then(res=>{
            let index = posts.findIndex(post=>post._id === res.data.post._id)
            let newPosts = [...posts]
            newPosts.splice(index,1,res.data.post)
            console.log(newPosts)
            dispatch(getPostsSuccess(newPosts))
           
        })
        .catch()
    }
    return (
        <div className={styles.postsContainer}>
            {
                posts.map(post=><Post key={post._id} {...post} handleLike={handleLike} userId={user._id} />)
            }
        </div>
    );
}

export default PostContainer;