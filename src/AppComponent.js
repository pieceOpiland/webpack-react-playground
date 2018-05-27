import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router';

import MenuComponent from './NavComponent';
import HomeComponent from './HomeComponent';
import AnotherComponent from './AnotherComponent';
import NotFoundComponent from './NotFoundComponent';

class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <MenuComponent/>
                <div className="container">
                    <p>Welcome to a Universal React App!!!</p>
                    <p>
                        <Switch>
                            <Route exact path="/" component={HomeComponent}/>
                            <Redirect to="/another" from="/old-link" />
                            <Route exact path="/another" component={AnotherComponent}/>
                            <Route component={NotFoundComponent} />
                        </Switch>
                    </p>
                </div>
            </div>
        )
    }
}

export default hot(module)(AppComponent);
