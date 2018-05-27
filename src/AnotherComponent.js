import React from 'react';
import { hot } from 'react-hot-loader';

class AnotherComponent extends React.Component {
    render() {
        return (
            <span>Another Component</span>
        );
    }
}

export default hot(module)(AnotherComponent);
