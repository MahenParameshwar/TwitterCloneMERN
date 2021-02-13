import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  Route, Switch, useParams } from 'react-router-dom';

import MainLayout from '../Layouts/MainLayout';
import {  makeGetUserProfileRequest } from '../Redux/Profile/action';
import { makeGetUserDataRequest } from '../Redux/User/action';
import styles from '../Styles/profile.module.css'

import Tab from '../Components/Tab';

import FollowUsers from '../Components/FollowUsers';

function FollowersFollowing(props) {
    const {username} = useParams();
    const {profile,error} = useSelector(state=>state.profile);
    
    const {user} =  useSelector(state=>state.user);
    const token = localStorage.getItem("token")
    const dispatch = useDispatch();

    
    
    useEffect(()=>{
        console.log(profile,user)
       if(profile == null)
        dispatch(makeGetUserProfileRequest({username}))
        if(user == null){
            dispatch(makeGetUserDataRequest(token))
        }
    },[])
  
   
  

    return (
        <MainLayout title={username}>
        {
            error ?( 
                <div className={styles.errorUser}>
                    <h3 >
                        User not found
                    </h3>
                    <span>
                        Check the url you are tring to access
                    </span>
                </div>
            )
            :
            profile ?
            <>
               
                <div className={styles.tabsContainer}>
                        <Tab name={"Following"} link={`/profile/${profile.username}/following`} />
                        <Tab name={"Followers"} link={`/profile/${profile.username}/followers`} />
                </div>
               <Switch>
                    <Route path="/profile/:username/following" exact>
                    <FollowUsers followArr={profile.following} noFollowersMsg={"This profile follows no one"} showFollowBtn={true} />
                    </Route>
                    <Route path="/profile/:username/followers" exact>
                    <FollowUsers followArr={profile.followers} noFollowersMsg={"This profile has no followers"} />
                    </Route>
                
                </Switch>
                
                
                
                
            </>
            :<></>
        }
    
      {/*PostContainer */}
   </MainLayout>
    );
}

export default FollowersFollowing;