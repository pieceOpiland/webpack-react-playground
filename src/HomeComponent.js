import React from 'react';
import { hot } from 'react-hot-loader';

class HomeComponent extends React.Component {
    render() {
        return (
            <span>Home Component</span>
        );
    }
}

export default hot(module)(HomeComponent);
