import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Route, Switch, useParams } from 'react-router-dom';
import ImageContainer from '../Components/ImageContainer';
import MainLayout from '../Layouts/MainLayout';
import { makeFollowRequest, makeGetUserProfileRequest } from '../Redux/Profile/action';
import { makeGetUserDataRequest } from '../Redux/User/action';
import styles from '../Styles/profile.module.css'
import classnames from 'classnames';
import Tab from '../Components/Tab';
import PostContainer from '../Components/Posts/PostContainer';
import ProfilePosts from '../Components/ProfilePosts';
import ReplyPosts from '../Components/ReplyPosts';


function Profile({getReply}) {
    const {username} = useParams();
    const {profile,error,posts:profilePosts} = useSelector(state=>state.profile);
    const {posts} = useSelector(state=>state.posts);
    const {user} =  useSelector(state=>state.user);
    const token = localStorage.getItem("token")
    const dispatch = useDispatch();


    const handleFollow = (profileId)=>{
        console.log(profileId)
        dispatch(makeFollowRequest({profileId,token}))
    }
   
    useEffect(()=>{
        if(profile === null){
            dispatch(makeGetUserProfileRequest({username,getReply}))
        }
       
        if(user == null){
            dispatch(makeGetUserDataRequest(token))
        }
    },[username,posts,getReply,profile])

    const isFollowing = profile?.followers.includes(user._id)
   

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
                    <div className={styles.profileHeaderContainer}>
                        <div className={styles.coverPhotoContainer}>
                            
                               <ImageContainer profilePic={profile.profilePic} />
                            
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
                            <Tab name={"Posts"} link={`/profile/${profile.username}`} />
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
    );
}

export default Profile;