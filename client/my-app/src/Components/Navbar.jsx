import React from 'react';
import {Link} from 'react-router-dom'

function Navbar({styles}) {
    return (
        <nav className="col-2 ">
        <Link className={styles.blue} to="/">
             <i className="fas fa-dove"></i>
        </Link>
        <Link to="/">
             <i className="fas fa-home"></i>
        </Link>
        <Link to="/search">
             <i className="fas fa-search"></i>
        </Link>
        <Link to="/notification">
             <i className="fas fa-bell"></i>
        </Link>
        <Link to="/messages">
             <i className="fas fa-envelope"></i>
        </Link>
        <Link to="/login" onClick={()=>localStorage.removeItem("token")}>
             <i className="fas fa-sign-out-alt"></i>
        </Link>
     </nav>
    );
}

export default Navbar;