import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Post from '../Components/Posts/Post';
import PostContainer from '../Components/Posts/PostContainer';
import MainLayout from '../Layouts/MainLayout';
import { makeGetSinglePostRequest } from '../Redux/Posts/action';
import { makeGetUserDataRequest } from '../Redux/User/action';

function ViewPost(props) {
    const {id} = useParams();
    const {user} = useSelector(state=>state.user)
    const dispatch = useDispatch();
    const {token} = localStorage.getItem("token")
    const {post,posts} = useSelector(state=>state.posts)
  
    useEffect(()=>{
        if(user == null){
            dispatch(makeGetUserDataRequest(token));
        }

        dispatch(makeGetSinglePostRequest({id}))
       
        
    },[posts,id])
    if(post){
        console.log(post.replyTo)
    }
    
    return (
       <MainLayout title="View Post">
           {
               post ? <>
               {/*Post you are viewing */}      
               {
                   post.replyTo ?
                   <PostContainer posts={post.replyTo}>
                   
                    </PostContainer> : null

               }
               
                {/*Post you are viewing */}      
                <PostContainer posts={[post.postData]} 
                
                heighLight = {{fontSize:"18px",backgroundColor:"rgba(18, 166, 235,.2)",borderRadius:"10px"}}  >
                   
               </PostContainer>
               {/*Comments to the post you are viewing*/}
               <PostContainer posts={post.replies}>
                   
               </PostContainer>
               
               </> : null
           }
       </MainLayout>
    );
}

export default ViewPost;