import React from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';

class NavComponent extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/another">Another</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/old-link">Old Link</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default hot(module)(NavComponent);
