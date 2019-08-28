import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';

import Status from './Status';
import Title from './Title';

import { loadHealth } from '../reducers/health/actions';

const HealthComponent = function({health, loadHealth}) {
    useEffect(function() {
        if(health === "") {
            loadHealth();
        }
    });
    return (
        <React.Fragment>
            { health !== "OK" ? <Status code={500} /> : undefined }
            <Title>Universal React App - Health</Title>
            <Typography>{health}</Typography>
        </React.Fragment>
    )
};

const mapStateToProps = function(state) {
    return {
        health: state.health
    };
};

const mapDispatchToProps = {
    loadHealth
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthComponent);
