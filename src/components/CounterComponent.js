import React, { Component } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { loadCounter, incrementCounter } from "../reducers/counter/actions";

class CounterComponent extends Component {

    componentDidMount() {
        if(!this.props.counter) {
            this.props.loadCounter();
        }
    }

    render() {
        return (
            <div>
                <Typography>Counter: {this.props.counter}</Typography>
                <Button onClick={this.props.incrementCounter} variant="contained">Increment</Button>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        counter: state.counter
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        loadCounter: function () {
            dispatch(loadCounter());
        },
        incrementCounter: function () {
            dispatch(incrementCounter());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
