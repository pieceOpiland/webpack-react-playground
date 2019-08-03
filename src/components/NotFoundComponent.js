import React from 'react';

import Status from './Status';


export default function NotFoundComponent() {
    return (
        <Status code={404}>
            <div>Not Found Component</div>
        </Status>
    );
}
