import React, {Component} from 'react';

import PropTypes from 'prop-types';

import withSideEffect from 'react-side-effect';

const reducePropsToState = function(propList) {
    if(propList.length > 0) {
        return propList[propList.length - 1].children;
    }
    return '';
};

const handleStateChange = function(state) {
    document.title = state;
};

const Title = withSideEffect(reducePropsToState, handleStateChange)(() => null);

Title.propTypes = {
    children: PropTypes.string.isRequired
};

export default Title;
