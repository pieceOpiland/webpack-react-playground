import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import StylesProvider from '@material-ui/styles/StylesProvider';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers/index';

import Theme from './utils/theme';
import AppComponent from './components/AppComponent';
import createGenerateClassName from "@material-ui/styles/createGenerateClassName";

const middlewares = [thunk];

if(process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

const store = createStore(reducer, window.__PRELOADED_STATE__, applyMiddleware(...middlewares));

document.getElementById('serverStyles').remove();
document.getElementById('preloadedState').remove();
delete window.__PRELOADED_STATE__;

ReactDOM.hydrate(
    <Provider store={store}>
        <Router>
            <StylesProvider
                generateClassName={createGenerateClassName({disableGlobal: process.env.NODE_ENV === 'production'})}>
                <ThemeProvider theme={Theme}>
                    <AppComponent/>
                </ThemeProvider>
            </StylesProvider>
        </Router>
    </Provider>,
    document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./reducers/index', function() {
        const newReducer = require('./reducers/index').default;
        store.replaceReducer(newReducer);
    });
}
