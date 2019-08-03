import React from 'react';
import { Route } from 'react-router';

// See https://reacttraining.com/react-router/web/guides/server-rendering
export default function Meta({children, code}) {
    return (
        <Route
            render={function({staticContext}) {
                if (staticContext) {
                    staticContext.status = code;
                }
                return children;
            }}
        />
    )
};
