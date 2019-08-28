import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Title from './Title';

import { loadCounter, incrementCounter } from "../reducers/counter/actions";

const CounterComponent = function({counter, loadCounter, incrementCounter}) {
    useEffect(function() {
        if(!counter) {
            loadCounter();
        }
    });

    return (
        <div>
            <Title>Universal React Page - Counter</Title>
            <Typography>Counter: {counter}</Typography>
            <Button onClick={incrementCounter} variant="contained">Increment</Button>
        </div>
    );
};

const mapStateToProps = function(state) {
    return {
        counter: state.counter
    }
};

const mapDispatchToProps = {
    loadCounter,
    incrementCounter
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
