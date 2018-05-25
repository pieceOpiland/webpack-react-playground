import React from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router';

import MenuComponent from './MenuComponent';
import HomeComponent from './HomeComponent';
import AnotherComponent from './AnotherComponent';
import NotFoundComponent from './NotFoundComponent';

class AppComponent extends React.Component {
    render() {
        return (
            <div>
                <MenuComponent/>
                <hr />
                <p>Hello!</p>
                <p>
                    <Switch>
                        <Route exact path="/" component={HomeComponent}/>
                        <Redirect to="/another" from="/old-link" />
                        <Route exact path="/another" component={AnotherComponent}/>
                        <Route component={NotFoundComponent} />
                    </Switch>
                </p>
            </div>
        )
    }
}

export default hot(module)(AppComponent);
