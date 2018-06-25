import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router';

import MenuComponent from './NavComponent';
import HomeComponent from './HomeComponent';
import AnotherComponent from './AnotherComponent';
import NotFoundComponent from './NotFoundComponent';
import CounterComponent from "./CounterComponent";

class AppComponent extends Component {
    render() {
        return (
            <div>
                <MenuComponent/>
                <div className="container">
                    <header>Welcome to a Universal React App!!!</header>
                    <main>
                        <Switch>
                            <Route exact path="/" component={HomeComponent} />
                            <Redirect to="/another" from="/old-link" />
                            <Route exact path="/another" component={AnotherComponent} />
                            <Route exact path="/counter" component={CounterComponent} />
                            <Route component={NotFoundComponent} />
                        </Switch>
                    </main>
                </div>
            </div>
        )
    }
}

export default AppComponent;
