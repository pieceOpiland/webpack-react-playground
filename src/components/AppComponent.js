import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router';

import MenuComponent from './NavComponent';
import HomeComponent from './HomeComponent';
import AnotherComponent from './AnotherComponent';
import NotFoundComponent from './NotFoundComponent';
import CounterComponent from "./CounterComponent";

class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <MenuComponent/>
                <div className="container">
                    <p>Welcome to a Universal React App!!!</p>
                    <div>
                        <Switch>
                            <Route exact path="/" component={HomeComponent}/>
                            <Redirect to="/another" from="/old-link" />
                            <Route exact path="/another" component={AnotherComponent}/>
                            <Route exact path="/counter" component={CounterComponent}/>
                            <Route component={NotFoundComponent} />
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default hot(module)(AppComponent);
