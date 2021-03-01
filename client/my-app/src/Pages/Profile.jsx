import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch, useParams } from 'react-router-dom';

import MainLayout from '../Layouts/MainLayout';
import { makeFollowRequest, makeGetUserProfileRequest } from '../Redux/Profile/action';
import { makeGetUserDataRequest } from '../Redux/User/action';
import styles from '../Styles/profile.module.css'
import classnames from 'classnames';
import Tab from '../Components/Tab';
import PostContainer from '../Components/Posts/PostContainer';
import { useState } from 'react';
import ImageUploadModal from '../Components/Modal/ImageUploadModal';
import Loader from '../Components/Loader';
import ProfileImageContainer from '../Components/ProfileImageContainer';



function Profile({getReply}) {
    const {username} = useParams();
    const {profile,error,posts:profilePosts,isLoading} = useSelector(state=>state.profile);
    const {posts} = useSelector(state=>state.posts);
    const {user} =  useSelector(state=>state.user);
    const token = localStorage.getItem("token")

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => setShow(true);

    

    const dispatch = useDispatch();


    const handleFollow = (profileId)=>{
       
        dispatch(makeFollowRequest({profileId,token}))
    }
   
    useEffect(()=>{
       
        dispatch(makeGetUserProfileRequest({username,getReply}))
        if(user == null){
            dispatch(makeGetUserDataRequest(token))
        }
    },[username,posts,getReply,user?.profilePic,user?.coverPic])

    const isFollowing = profile?.followers.find(follwer=>follwer._id=== user._id)
   

    return (
        <>
        {
        isLoading && <Loader />   
      }
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
                    <div className={styles.profileHeaderContainer}>

                        <div className={styles.coverPhotoContainer}>
                           
                            <ProfileImageContainer profilePic={profile.profilePic} showUploadPic={profile._id === user._id}  />
                            <div className={styles.coverPicBtnContainer} >
                                { profile._id === user._id && 

                                    <button onClick={handleShow} >
                                        <i className="fas fa-camera" />
                                    </button>

                                }
                               
                                <ImageUploadModal title={"Upload new Cover Pic"} isCoverPic={true} show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} />
                                </div> 
                                {
                                    profile?.coverPic && <img style={{width:"100%",objectFit:"fill",height:"100%"}} src={profile.coverPic} alt="cover pic"/>
                                }
                        </div>
                        <div className={styles.profileButtonsContainer}>
                            {
                                user ?
                                profile._id !== user._id ?
                                <>
                                {}
                                    <Link className={styles.profileButton} to={`/messages/${profile._id}`}>
                                        <i className="fas  fa-envelope"/>
                                    </Link>
                                    <button onClick={()=>handleFollow(profile._id)} className={classnames(styles.followButton,{[styles.following]:isFollowing})}>
                                       {
                                           isFollowing ? "Following" : "Follow"
                                       }
                                    </button>
                                </> : <></> : <></>
                            }
                        </div>
                        <div className={styles.userDetailsContainer}>
                            <h5 className={styles.displayName}>
                                {profile.firstname + " " + profile.lastname}
                            </h5>
                            <span className={styles.userName}>
                                @{profile.username}
                            </span>
                            <span className={styles.description}>
                                {profile.description}
                            </span>
                            <div className={styles.followersContainer}>
                                <Link to={`/profile/${profile.username}/following`} >
                                    <span className={styles.value}>
                                        {profile.following.length}
                                    </span>
                                    <span>
                                        Following
                                    </span>
                                </Link>
                                <Link to={`/profile/${profile.username}/followers`} >
                                    <span className={styles.value}>
                                        {profile.followers.length}
                                    </span>
                                    <span>
                                        Followers
                                    </span>
                                </Link>
                            </div>
                     </div>
                    </div>
                    <div className={styles.tabsContainer}>
                            <Tab name={"Tweets"} link={`/profile/${profile.username}`} />
                            <Tab name={"Replies"} link={`/profile/${profile.username}/replies`} />
                    </div>
                   <Switch>
                        <Route path="/profile/:username/replies" exact>
                                <PostContainer posts={profilePosts} />
                        </Route>
                        <Route path="/profile/:username" exact>
                            <PostContainer posts={profilePosts} />
                        </Route>
                        
                    </Switch>
                    
                    
                    
                    
                </>
                :<></>
            }
        
          {/*PostContainer */}
       </MainLayout>
       </>
    );
}

export default Profile;