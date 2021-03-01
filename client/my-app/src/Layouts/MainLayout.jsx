import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FollowUsers from '../Components/FollowUsers';
import Navbar from '../Components/Navbar';
import { makeGetRecomdationsRequest } from '../Redux/User/action';
import styles from '../Styles/main.module.css'

function MainLayout(props) {
    const [newsArr,setNewArr] = useState(null);
    const {recomdations} = useSelector(state=>state.user)
    const token = localStorage.getItem("token")
    const dispatch = useDispatch()
   
    useEffect(()=>{
        
     
        axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=s7ukuiP96CJTGSxmsjRGusveK0FWGiiH")
        .then(res=>setNewArr(res.data.results)).catch(err=>{        
        })
        dispatch(makeGetRecomdationsRequest({token}))
     
        
    },[])

    return (
        <div className='wrapper'>
            <div className="row">
                <Navbar styles={styles} />
                <div className={`${styles.mainSectionContainer} col-10 col-md-10 col-lg-6`}>
                    <div className={styles.titleContainer}>
                        <h1>{props.title}</h1>
                    </div>
                    {
                        props.children
                    }
                </div>
                {
                  
                <div className="col-2 d-none  d-lg-block col-lg-4" style={{padding:"60px"}}>
                    <div style={{margin:"40px 0 60px 0",
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"flex-start"
                    }}>
                        <h1 style={{margin:"10px 0 10px 0"}}>You might like</h1>
                        {
                            
                            
                            <div >
                                <FollowUsers followArr={recomdations} showFollowBtn={true} />
                        
                            </div>
                            }
                    </div>
                    <h1 style={{marginBottom:"40px"}}>What's happening ?</h1>
                    {
                        newsArr && newsArr.filter((_,i)=>i <= 10).map((news,index)=>{
                            if( news.multimedia?.length)
                            return  <div key={index} style={{display:"flex",justifyContent:"space-between",marginBottom:"10px"}}>
                                <h6>
                                    {news.title}
                                </h6>
                                <div >
                                    {
                                        news.multimedia?.length &&
                                        <img width="100px" style={{borderRadius:"10px"}} src={news.multimedia[0].url} alt="news_pic" />
                                    }
                                    
                                </div>
                            </div>
                            
                        })
                    }
                </div>
                }
            </div>
        </div>
    );
}

export default MainLayout;