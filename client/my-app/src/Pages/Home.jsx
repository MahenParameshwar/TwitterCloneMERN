import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PostContainer from '../Components/Posts/PostContainer';
import PostForm from '../Components/Posts/PostForm';
import MainLayout from '../Layouts/MainLayout';
import { makeGetPostsRequest } from '../Redux/Posts/action';
import { makeGetUserDataRequest } from '../Redux/User/action';

function Home(props) {
    
    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    useEffect(()=>{
        dispatch(makeGetUserDataRequest(token))
        dispatch(makeGetPostsRequest(token));
    })
    return (
        <MainLayout>
               <PostForm/>
               <PostContainer/>
        </MainLayout>
    );
}

export default Home;    