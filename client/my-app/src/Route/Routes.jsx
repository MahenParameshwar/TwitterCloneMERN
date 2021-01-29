import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import PrivateRoute from './PrivateRoute';

function Routes(props) {
    return (
        <Switch>
            <Route path="/login" exact render={()=><Login/>} />
            <Route path="/register" exact render={()=><Register/>} />
            <PrivateRoute path="/" exact Component={Home} />
        </Switch>
    );
}

export default Routes;