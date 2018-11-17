const fs = require('fs');
const path = require('path');

require('babel-polyfill');
require('babel-register');

const express           = require('express');
const compression       = require('compression');
const _                 = require('lodash');
const createStore       = require('redux').createStore;
const Provider          = require('react-redux').Provider;
const React             = require('react');
const ReactDOMServer    = require('react-dom/server');
const CleanCSS          = require('clean-css');
const SheetsRegistry    = require('jss').SheetsRegistry;
const StaticRouter      = require('react-router').StaticRouter;
const router            = require('./src/routes').default;
const reducer           = require('./src/reducers').default;


const app = express();

if(process.env.NODE_ENV !== 'production') {
    const webpack               = require('webpack');
    const webpackDevMiddleware  = require('webpack-dev-middleware');
    const hotMiddleware         = require('webpack-hot-middleware');

    const config    = require('./webpack.dev');
    const compiler  = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true
    }));

    app.use(hotMiddleware(compiler));
}

if(process.env.NODE_ENV === 'production') {
    app.use(compression());

    // TODO: Figure out how to do code-splitting on this.
    app.use('/dist/bundle.js', function(req, res) {
        res.sendFile(path.resolve('./dist/bundle.js'));
    });
}

app.use(router);

fs.readFile('./index.html', 'utf-8', function(err, data) {
    const template = _.template(data);
    const cleaner = new CleanCSS();
    app.use(function(req, res) {

        if(process.env.NODE_ENV !== 'production') {
            const cache = require.cache;
            const srcPath = path.resolve(__dirname, 'src');
            for(const key in cache) {
                if(key.startsWith(srcPath)) {
                    delete cache[key];
                }
            }
        }

        const sheetsRegistry = new SheetsRegistry();
        const sheetsManager = new Map();

        const AppComponent = require('./src/components/AppComponent').default;
        const ThemeComponent = require('./src/components/ThemeComponent').default;
        const context = {};

        const content = ReactDOMServer.renderToString(
            React.createElement(Provider, { store: createStore(reducer, res.locals.state) },
                React.createElement(StaticRouter, { context, location: req.url },
                    React.createElement(ThemeComponent, {
                            registry: sheetsRegistry,
                            sheetsManager: sheetsManager
                        },
                        React.createElement(AppComponent, null, null)
                    )
                )
            )
        );

        cleaner.minify(sheetsRegistry.toString(), function(err, output) {
            if (!err) {
                const html = template({
                    content: content,
                    styles: output.styles,
                    state: res.locals.state
                });

                if (context.url) {
                    res.redirect(context.url);
                } else {
                    if (context.status) {
                        res.status(context.status);
                    }
                    res.end(html);
                }
            } else {
                console.warn(err);
            }
        })


    });

    app.listen(process.env.PORT || 3000, function() {
        console.log('Listening on port ' + (process.env.PORT || 3000) );
    });
});

