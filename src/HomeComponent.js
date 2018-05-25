import React from 'react';
import { hot } from 'react-hot-loader';

class HomeComponent extends React.Component {
    render() {
        return (
            <div>Home Component</div>
        );
    }
}

export default hot(module)(HomeComponent);
