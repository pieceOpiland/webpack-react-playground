import React, {Children} from 'react';

import withSideEffect from 'react-side-effect';
import PropTypes from 'prop-types';

const reducePropsToState = function(propList) {
    return propList.reduce(function(acc, props) {
        let propsCopy = Object.assign({}, props);
        const name = propsCopy['name'];
        delete propsCopy['name'];
        acc[name] = propsCopy;
        return acc;
    }, {});
};

const handleStateChange = function(state) {
    const keys = Object.keys(state);

    for(let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if(state.hasOwnProperty(key)) {
            let tag = document.head.querySelector(`[name=${key}]`);
            if (tag === null) {
                tag = document.createElement('meta');
                tag.name = key;
                document.head.append(tag);
            }

            for(const attr of tag.attributes) {
                if(attr.name !== "name") {
                    tag.removeAttribute(attr.name);
                }
            }

            const entries = Object.entries(state[key]);
            entries.map((entry) => tag.setAttribute(entry[0], entry[1]));
        }
    }
};

const Meta = withSideEffect(reducePropsToState, handleStateChange)((props) => {
    if(props.children) {
        return Children.only(props.children);
    } else {
        return null;
    }
});

Meta.propTypes = {
    name: PropTypes.string.isRequired
};

Meta.toHtml = function(state) {
    const keys = Object.keys(state);
    return keys.map(function(key) {
        const entries = Object.entries(state[key]);
        return `<meta name="${key}" ${entries.map((entry) => `${entry[0]}="${entry[1]}"`).join(' ')} />`
    }).join('');
};

export default Meta;
