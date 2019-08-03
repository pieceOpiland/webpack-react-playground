import React, {Component} from 'react';
import {
    createMuiTheme
} from '@material-ui/core/styles';
import {
    ThemeProvider
} from '@material-ui/styles';
import green from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

import { hot } from 'react-hot-loader';

export const Theme = createMuiTheme({
    palette: {
        primary: green,
        accent: red,
        type: 'light',
    },
    typography: {
        useNextVariants: true,
    }
});

class ThemeComponent extends Component {
    componentDidMount() {
        const serverStyles = document.getElementById('serverStyles');
        if(serverStyles && serverStyles.parentNode) {
            serverStyles.parentNode.removeChild(serverStyles);
        }
    }
    render() {
        return (
            <ThemeProvider theme={Theme} sheetsManager={this.props.sheetsManager}>
                {this.props.children}
            </ThemeProvider>
        )
    }
}

export default hot(module)(ThemeComponent);