import React from 'react';

import { Switch, Route } from 'react-router';

import CssBaseline from '@material-ui/core/CssBaseline';
import withStyles from '@material-ui/core/styles/withStyles';

import Meta from './Meta';
import Title from './Title';

import NavComponent from './NavComponent';
import HomeComponent from './HomeComponent';
import CounterComponent from './CounterComponent';
import HealthComponent from './HealthComponent';
import NotFoundComponent from './NotFoundComponent';

import theme from '../utils/theme';

import { hot } from 'react-hot-loader';

const styles = {
    main: {
        margin: theme.spacing(4)
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
                    <Route exact path="/health" component={HealthComponent} />
                    <Route component={NotFoundComponent} />
                </Switch>
            </main>
        </React.Fragment>
    )
}

export default hot(module)(withStyles(styles)(AppComponent));
