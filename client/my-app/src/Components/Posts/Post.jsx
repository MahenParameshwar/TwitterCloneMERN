import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../Styles/post.module.css' 
import ImageContainer from '../ImageContainer';
import timeDifference from '../../Utils/getTime'

const inlineStyle = {
    outline:{
        outline:"none"
    }
}
function Post({content,postedBy,createdAt,_id,handleLike,likes,userId}) {
    const hasLiked = ()=>{
        return likes.includes(userId)
    }
    return (
        postedBy ?
        <div className={styles.post}>
                <div className={styles.mainContentContainer}>
                    <ImageContainer profilePic={postedBy.profilePic} />
                    <div className={styles.postContentContainer}>
                        <div className={styles.header}>
                            <Link className={styles.displayName} to={`/profile/${postedBy.username}`}>
                                {postedBy.firstname+" "+postedBy.lastname}
                            </Link>
                            <span className = {styles.username}> @{postedBy.username}</span>
                            <span className = {styles.date}> {timeDifference(new Date(),new Date(createdAt))}</span>
                        </div>
                        <div className={styles.postBody}>
                            <span>{content}</span>
                        </div>
                        <div className={styles.postFooter}>
                            <div className={styles.postButtonContainer}>
                                    <button  style={{...inlineStyle.outline}}>
                                        <i className='far fa-comment'></i>
                                    </button>
                                </div>
                                <div className={styles.postButtonContainer}>
                                    <button  style={{...inlineStyle.outline}}>
                                        <i className='fas fa-retweet'></i>
                                    </button>
                                </div>
                                <div className={styles.postButtonContainer}>
                                    <button style={{...inlineStyle.outline}} 
                                    className={`${styles.postOptionButton} ${hasLiked() ? styles.red : ""}`} 
                                    onClick={()=>handleLike(_id)}>
                                        <i className='far fa-heart'></i>
                                        <span> {likes.length || ""}</span>
                                        
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
        </div> : <></>
   
    );
}

export default Post;