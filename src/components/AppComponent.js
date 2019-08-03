import React from 'react';

import { Switch, Route } from 'react-router';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import Meta from './Meta';
import Title from './Title';

import NavComponent from './NavComponent';
import HomeComponent from './HomeComponent';
import CounterComponent from './CounterComponent';
import NotFoundComponent from './NotFoundComponent';

import { hot } from 'react-hot-loader';

const styles = {
    main: {
        margin: 32
    }
};

function AppComponent({ classes }) {
    return (
        <React.Fragment>
            <Title>Universal React App</Title>
            <Meta name="description" content="This is just a sample Universal React Application." />
            <CssBaseline />
            <NavComponent />
            <main className={classes.main}>
                <Switch>
                    <Route exact path="/" component={HomeComponent} />
                    <Route exact path="/counter" component={CounterComponent} />
                    <Route component={NotFoundComponent} />
                </Switch>
            </main>
        </React.Fragment>
    )
}

export default hot(module)(withStyles(styles)(AppComponent));
