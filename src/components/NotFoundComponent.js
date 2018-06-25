import React, { Component } from 'react';

import Status from './Status';

class NotFoundComponent extends Component {
    render() {
        return (
            <Status code={404}>
                <div>Not Found Component</div>
            </Status>
        );
    }
}

export default NotFoundComponent;
