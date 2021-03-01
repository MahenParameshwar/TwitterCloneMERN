import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'

function Navbar({styles}) {
     const {user} = useSelector(state=>state.user)
    
    return (
         
         user ? 
        <nav className="col-2 ">
        <Link className={styles.blue} to="/">
             <i className="fas fa-dove"></i>
        </Link>
        <Link to="/">
             <i className="fas fa-home"></i>
        </Link>
        <Link to="/search/posts">
             <i className="fas fa-search"></i>
        </Link>
        {/* <Link to="/notification">
             <i className="fas fa-bell"></i>
        </Link>
        <Link to="/messages">
             <i className="fas fa-envelope"></i>
        </Link> */}
        <Link to={`/profile/${user.username}`}>
             <i className="fas fa-user"></i>
        </Link>
        <Link to="/login" onClick={()=>localStorage.removeItem("token")}>
             <i className="fas fa-sign-out-alt"></i>
        </Link>
     </nav>
     :
     <></>
    );
}

export default Navbar;