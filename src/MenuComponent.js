import React from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

class MenuComponent extends React.Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/another">Another</Link></li>
                    <li><Link to="/old-link">Old Link</Link></li>
                </ul>
            </nav>
        );
    }
}

export default hot(module)(MenuComponent);
