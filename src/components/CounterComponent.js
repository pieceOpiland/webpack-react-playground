import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import { loadCounter, incrementCounter } from "../reducers/counter/actions";

class CounterComponent extends React.Component {

    componentDidMount() {
        if(!this.props.counter) {
            this.props.loadCounter();
        }
    }

    render() {
        return (
            <div>
                <p>Counter: {this.props.counter}</p>
                <p><button type="button" className="btn btn-primary" onClick={this.props.incrementCounter}>Increment</button></p>
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

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(CounterComponent))