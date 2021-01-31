import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from '../../Styles/post.module.css' 
import ImageContainer from '../ImageContainer';
import timeDifference from '../../Utils/getTime'
import ReplyModal from '../Modal/ReplyModal';
import DeleteModal from '../Modal/DeleteModal';

const inlineStyle = {
    outline:{
        outline:"none"
    }
}
function Post({post,handleLike,userId,heighLight,handleRetweet,disabled=false}) {
    
    const [show, setShow] = useState(false);
    
    const [showDelete, setShowDelete] = useState(false);

    const history = useHistory()
    
    
    let {content,retweetData,postedBy,createdAt,_id,likes,retweetUsers} = post
    
    const handleClose = () => setShow(false);
    const handleShow = (e) => setShow(true);

    const handleCloseDelete = ()=>setShowDelete(false)

    const isRetweet = retweetData !== undefined;
    const retweetedBy = isRetweet ? postedBy.username : null;
    
    let replyTo = null 
    
    const hasLiked = ()=>{
        return likes.includes(userId)
    }

    const hasRetweeted = ()=>{
        return retweetUsers.includes(userId)
    }

    const goToPost = (e)=>{
        if(e.target.nodeName !== "BUTTON" && e.target.nodeName !== "A" ){
            history.push(`/post/${post._id}`)
        }
    }

    

    if(isRetweet){
        content = retweetData.content
        postedBy = retweetData.postedBy
        createdAt = retweetData.createdAt
        _id = retweetData._id
        likes = retweetData.likes
        retweetUsers = retweetData.retweetUsers
    }

    if(_id == null){
        return alert('Post data is null')
    }
    if(post.replyTo){
        replyTo = post.replyTo.postedBy.username
    }
    
    

    return (
        postedBy ?
        <div style={{...heighLight}} className={styles.post}>
            {
                isRetweet ? (
                <div className = {styles.retweetContainer}>
                     <i className='fas fa-retweet'></i>
                    <span>Retweeted by <Link to={`/profile/`}>@{retweetedBy}</Link> </span> 
                </div> )
                : null
            }
                <div className={styles.mainContentContainer}>
                    <ImageContainer  profilePic={postedBy.profilePic} />
                    <div className={styles.postContentContainer}>
                        <div className={styles.header}>
                            <Link className={styles.displayName} to={`/profile/${postedBy.username}`}>
                                {postedBy.firstname+" "+postedBy.lastname}
                            </Link>
                            <span className = {styles.username}> @{postedBy.username}</span>
                            <span  onClick={(e)=>goToPost(e)} className = {styles.date}> {timeDifference(new Date(),new Date(createdAt))}</span>
                            {
                                postedBy._id === userId ? 
                                <button style={{...inlineStyle.outline}} onClick={()=>setShowDelete(true)}>
                                    <i className="fas fa-times" />
                                </button> :
                                <></>
                            }

                       </div>
                        {
                            replyTo ? 
                            <div className={styles.replyFlag}>
                                Replying to <Link className={styles.blue} to={`/profile/${replyTo }`}>
                                    @{replyTo }
                                </Link>
                            </div>:
                            null
                        }
                        <div className={styles.postBody}>
                            <span>{content}</span>
                        </div>
                        <div className={styles.postFooter}>
                            <div className={styles.postButtonContainer}>
                                    <button onClick={(e)=>handleShow(e)} disabled={disabled}  style={{...inlineStyle.outline}}>
                                        <i className='far fa-comment'></i>
                                    </button>
                                </div>
                                <div className={styles.postButtonContainer}>
                                    <button  style={{...inlineStyle.outline}}
                                    onClick={()=>handleRetweet(_id)}
                                    disabled={disabled}
                                    className={`${styles.postOptionButton} ${hasRetweeted() ? styles.green : ""}`} 
                                    >
                                        <i className='fas fa-retweet'></i>
                                        <span> {retweetUsers.length || ""}</span>
                                    </button>
                                </div>
                                <div className={styles.postButtonContainer}>
                                    <button style={{...inlineStyle.outline}}
                                    disabled={disabled} 
                                    className={`${styles.postOptionButton} ${hasLiked() ? styles.red : ""}`} 
                                    onClick={()=>handleLike(_id)}>
                                        <i className='far fa-heart'></i>
                                        
                                        <span> {likes.length || ""}</span>
                                        
                                    </button>
                                </div>
                            </div>
                        </div>
                </div>
                <ReplyModal show={show} handleClose={handleClose} setShow={setShow}  userId={userId}  post={post} />
                <DeleteModal show={showDelete} handleClose={handleCloseDelete} setShow={setShowDelete}  userId={userId}  post={post} />
        </div> : <></>
   
    );
}

export default Post;