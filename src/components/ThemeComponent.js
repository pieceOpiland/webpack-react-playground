import React from 'react';
import {
    ThemeProvider,
    StylesProvider,
    createGenerateClassName
} from '@material-ui/styles';
import { SheetsRegistry } from "jss";

import Theme from '../utils/theme';

class ThemeComponent {
    constructor() {
        this.registry = new SheetsRegistry();
        this.sheetsManager = new Map();
    }
    render() {
        return ({children}) => (
            <StylesProvider
                generateClassName={createGenerateClassName({disableGlobal: process.env.NODE_ENV === 'production'})}
                sheetsManager={this.sheetsManager}
                sheetsRegistry={this.registry}>
                <ThemeProvider theme={Theme}>
                    {children}
                </ThemeProvider>
            </StylesProvider>
        );
    }

    toString() {
        return this.registry.toString();
    }
}

export default ThemeComponent;