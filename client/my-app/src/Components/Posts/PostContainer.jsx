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
           console.log(res)
            dispatch(getPostsSuccess(res.data.results))
           
        })
        .catch(err=>{

        })
    }

    const handleRetweet = (id)=>{
        
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/auth/post/${id}/retweet`,{},{
            headers:{
                Authorization: `bearer ${token}`,
            }
        })
        .then(res=>{
            
            dispatch(getPostsSuccess(res.data.results))
           
        })
        .catch(err=>{

        })
    }
    return (
        <div className={styles.postsContainer}>
            {
                posts.map(post=><Post key={post._id} {...post} 
                    handleLike={handleLike} 
                    handleRetweet={handleRetweet} 
                    userId={user._id} />)
            }
        </div>
    );
}

export default PostContainer;