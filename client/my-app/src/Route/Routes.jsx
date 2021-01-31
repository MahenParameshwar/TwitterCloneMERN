import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';
import Register from '../Pages/Register';
import ViewPost from '../Pages/ViewPost';
import PrivateRoute from './PrivateRoute';

function Routes(props) {
    return (
        <Switch>
            <Route path="/login" exact render={()=><Login/>} />
            <Route path="/register" exact render={()=><Register/>} />
            <PrivateRoute path="/" exact Component={Home} />
            <PrivateRoute path="/post/:id" exact Component={ViewPost} />
            <PrivateRoute path="/profile/:username/replies" exact getReply={true} Component={Profile} />
            <PrivateRoute path="/profile/:username" exact Component={Profile} getReply={false} />
            
        </Switch>
    );
}

export default Routes;