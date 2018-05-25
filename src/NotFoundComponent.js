import React from 'react';
import { hot } from 'react-hot-loader';

import Status from './Status';

class NotFoundComponent extends React.Component {
    render() {
        return (
            <Status code={404}>
                <div>Not Found Component</div>
            </Status>
        );
    }
}

export default hot(module)(NotFoundComponent);
