import './style.css';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import AppComponent from './AppComponent';

ReactDOM.hydrate(
    <Router>
        <AppComponent/>
    </Router>,
    document.getElementById('app')
);
