import React from 'react';
import { hot } from 'react-hot-loader';

class AnotherComponent extends React.Component {
    render() {
        return (
            <div>Another Component</div>
        );
    }
}

export default hot(module)(AnotherComponent);
