import React from 'react';
import { Redirect,Route } from 'react-router-dom';

function PrivateRoute({Component,getReply,...rest}) {
    const token = localStorage.getItem('token')
    
    return (
        
            token ? <Route {...rest} render={()=><Component getReply={getReply}/>} />  : <Redirect to = "/login" />
        
         
        
    );
}

export default PrivateRoute;