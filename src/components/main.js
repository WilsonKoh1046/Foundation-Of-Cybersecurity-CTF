import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Profile from './profile';
import Admin from './admin';

export default function Main() {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/profile" component={Profile} />
                <Route path="/admin" component={Admin} />
            </Switch>
        </main>
    );
}