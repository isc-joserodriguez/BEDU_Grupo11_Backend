import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import Register from './Register/Register';
import Menu from './Menu/Menu';
import Chef from '../Chef/Chef';
import Users from './Users/Users';
import User from './Users/User/User';

const Admin = () => {
    const { path } = useRouteMatch();

    return (
        <>
            <Switch>
                <Route path={`${path}/new-user`}>
                    <Register />
                </Route>
                <Route path={`${path}/menu`}>
                    <Menu />
                </Route>
                <Route path={`${path}/orders`}>
                    <Chef />
                </Route>
                <Route path={`${path}/users/:id`}>
                    <User />
                </Route>
                <Route path={`${path}/users`}>
                    <Users />
                </Route>
            </Switch>
        </>
    )
}

export default Admin