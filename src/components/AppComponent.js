import React, { Component } from 'react';

import { Switch, Route } from 'react-router';

import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

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

class AppComponent extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
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
}

export default hot(module)(withStyles(styles)(AppComponent));
