const fs = require('fs');
const path = require('path');

require('babel-polyfill');
require('babel-register');

const express           = require('express');
const compression       = require('compression');
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
        res.type('text/javascript');
        res.sendFile(path.resolve('./dist/bundle.js'));
    });
}

app.use(router);

app.use(express.static(path.resolve('./public')));

let renderer;
if (process.env.NODE_ENV === 'production') {
    renderer = require('./index.prod');
} else {
    renderer = require('./index.dev');
}

const cleaner = new CleanCSS();

renderer(app, function(req, res, template) {
    const sheetsRegistry = new SheetsRegistry();
    const sheetsManager = new Map();

    const AppComponent = require('./src/components/AppComponent').default;
    const ThemeComponent = require('./src/components/ThemeComponent').default;
    const Meta = require('./src/components/Meta').default;
    const Title = require('./src/components/Title').default;
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

    const title = Title.rewind();
    const metaMap = Meta.rewind();

    cleaner.minify(sheetsRegistry.toString(), function(err, output) {
        if (!err) {
            const html = template({
                content: content,
                styles: output.styles,
                state: res.locals.state,
                metaData: Meta.toHtml(metaMap),
                title: title
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

