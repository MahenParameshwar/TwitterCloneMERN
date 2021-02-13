import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useParams } from 'react-router-dom';
import ImageContainer from '../Components/ImageContainer';

import { makeFollowRequest, makeFollowRequestFromFollowPage, makeGetUserProfileRequest } from '../Redux/Profile/action';
import { makeGetUserDataRequest } from '../Redux/User/action';
import styles from '../Styles/profile.module.css'
import classnames from 'classnames';

function FollowUsers({followArr,noFollowersMsg,showFollowBtn=false}) {
    
   
    const {user} =  useSelector(state=>state.user);
    
    const token = localStorage.getItem("token")
    const dispatch = useDispatch();

 


    const handleFollow = (profileId)=>{
      
        dispatch(makeFollowRequestFromFollowPage({profileId,token}))
    }
   
    

    const isFollowing = (followingId)=>user?.following.includes(followingId)
    
    return (
        <div className={styles.resultsContainer}>
        {
        !followArr.length?<span className={styles.noResults}>{noFollowersMsg}</span>:
        followArr.map(follow=>{
            return (
                <div key={follow._id} className={styles.user}>
                    <ImageContainer profilePic={follow.profilePic} />
                <div className={styles.userDetailsContainer}>
                    <div className="header">
                        <Link to={`/profile/${follow.username}`} >
                        {follow.firstname + " " + follow.lastname}
                        </Link>
                        <div>
                            <span className={styles.username}>
                                @{`${follow.username}`}
                            </span>
                        </div>
                    </div>
                    {showFollowBtn && follow._id !== user._id ?
                    <button  onClick={()=>handleFollow(follow._id)} className={classnames(styles.followButton,{[styles.following]:isFollowing(follow._id)})}>
                                       {
                                           isFollowing(follow._id)  ? "Following" : "Follow"
                                       }
                    </button> : <></>
                    }
                </div>
             
                
               
                </div>
            )
        })}
         </div>
    );
   
}

export default FollowUsers;