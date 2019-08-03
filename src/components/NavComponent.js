import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/HomeRounded';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    homeButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class ButtonAppBar extends Component {

    constructor(props) {
        super(props);
        this.state = {open: true};
    }

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position='static'>
                    <Toolbar>
                        <IconButton
                            className={classes.homeButton} color='inherit' aria-label='Home' component={Link} to='/'>
                            <HomeIcon/>
                        </IconButton>
                        <Typography variant='h6' color='inherit' className={classes.grow}>
                            My App
                        </Typography>
                        <Button color='inherit' component={Link} to='/counter'>Counter</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(ButtonAppBar);
