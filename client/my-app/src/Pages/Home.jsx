import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../Components/Loader';
import PostContainer from '../Components/Posts/PostContainer';
import PostForm from '../Components/Posts/PostForm';
import MainLayout from '../Layouts/MainLayout';
import { makeGetPostsRequest } from '../Redux/Posts/action';
import { makeGetUserDataRequest } from '../Redux/User/action';

function Home(props) {
    
    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    const {posts,isLoading} = useSelector(state=>state.posts)
    useEffect(()=>{
        dispatch(makeGetUserDataRequest(token))
        dispatch(makeGetPostsRequest(token));
    },[])
    return (
        <>
        {
            isLoading && <Loader/>
        }
        
        <MainLayout title="home" show={true}>
               <PostForm/>
               <PostContainer posts={posts}/>
        </MainLayout>
        </>
    );
}

export default Home;    