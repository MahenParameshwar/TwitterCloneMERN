import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Tab from '../Components/Tab';
import MainLayout from '../Layouts/MainLayout';
import { makeGetPostsRequest, makeSearchPostsRequest } from '../Redux/Posts/action';
import { makeGetUserDataRequest } from '../Redux/User/action';
import styles from '../Styles/profile.module.css'
import { DebounceInput } from "react-debounce-input";
import PostContainer from '../Components/Posts/PostContainer';
import { makeSearchProfilesRequest } from '../Redux/Profile/action';
import FollowUsers from '../Components/FollowUsers';


function Search({getUsers=false}) {
    const dispatch = useDispatch();
   const [search,setSearch] = useState("");
   
    const token = localStorage.getItem("token")
    const {posts,isLoading,searchPostsResults} = useSelector(state=>state.posts)
    const {searchProfileResults} = useSelector(state=>state.profile)
    useEffect(()=>{
        dispatch(makeGetUserDataRequest(token))
        dispatch(makeGetPostsRequest(token));    
    },[])

    const handleSearch = (e)=>{
        setSearch(e.target.value)
        if(!e.target.value)
        {
            return
        }
        if(getUsers)
        {
            dispatch(makeSearchProfilesRequest({
                token,
                searchQuery:e.target.value
            }))
        }
        else
        dispatch(makeSearchPostsRequest({
            token,
            searchQuery:e.target.value
        }))
    }
    
    
    

    return (
        <MainLayout title="Search">
            <div className={styles.searchBarCantainer}>
                    <i className="fas fa-search" />
                    <DebounceInput  minLength={2}  debounceTimeout={1000} type="text" name="search_input"
                     value={search} onChange={e =>handleSearch(e)} placeholder="Search for users or posts" />

            </div>
            <div className={styles.tabsContainer}>
                            <Tab name={"Posts"} link={`/search/posts`} />
                            <Tab name={"Users"} link={`/search/users`} />             
            </div>
                   <Switch>
                        <Route path="/search/users" exact>
                                {search && <FollowUsers followArr={searchProfileResults} showFollowBtn={true} />}
                        </Route>
                        <Route path="/search/posts" exact>{
                            search && <PostContainer disabled={true}  posts={searchPostsResults}  /> 
                        
                        }
                            
                        </Route>
                        
                    </Switch>
        </MainLayout>
    );  
}

export default Search;