import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../Styles/profile.module.css'

const isSelected = {
    color: "var(--blue)",
    borderBottom: "2px solid var(--blue)"
}
function Tab({name,link}) {
    return (
       <NavLink
       className={styles.tab}
       activeStyle = {{...isSelected}}
       to={link}
       exact
       >
           <span>
               {name}
           </span>
       </NavLink>
    );
}

export default Tab;