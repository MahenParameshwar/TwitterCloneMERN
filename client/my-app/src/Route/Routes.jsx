import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FollowersFollowing from '../Pages/FollowersFollowing';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Profile from '../Pages/Profile';
import Register from '../Pages/Register';
import Search from '../Pages/Search';
import ViewPost from '../Pages/ViewPost';
import PrivateRoute from './PrivateRoute';

function Routes(props) {
    return (
        <Switch>
            <Route path="/login" exact render={()=><Login/>} />
            <Route path="/register" exact render={()=><Register/>} />
            <PrivateRoute path="/" exact Component={Home} />
            <PrivateRoute path="/search/posts"  exact Component={Search} />
            <PrivateRoute path="/search/users" getUsers = {true} exact Component={Search} />
            <PrivateRoute path="/post/:id" exact Component={ViewPost} />
            <PrivateRoute path="/profile/:username/replies" exact getReply={true} Component={Profile} />
            <PrivateRoute path="/profile/:username" exact Component={Profile} getReply={false} />
            <PrivateRoute path="/profile/:username/following" exact Component={FollowersFollowing}/>
            <PrivateRoute path="/profile/:username/followers" exact Component={FollowersFollowing}/>
            <PrivateRoute path="/profile/:username/followers" exact Component={FollowersFollowing}/>
            
        </Switch>
    );
}

export default Routes;