import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reducers/index';

import {Theme} from './components/ThemeComponent';
import AppComponent from './components/AppComponent';

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
            <MuiThemeProvider theme={Theme}>
                <AppComponent/>
            </MuiThemeProvider>
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
