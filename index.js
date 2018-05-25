const fs = require('fs');

require('babel-polyfill');
require('babel-register');

const express               = require('express');
const webpack               = require('webpack');
const _                     = require('lodash');
const webpackDevMiddleware  = require('webpack-dev-middleware');
const hotMiddleware         = require('webpack-hot-middleware');

const React             = require('react');
const ReactDOMServer    = require('react-dom/server');

const StaticRouter  = require('react-router').StaticRouter;
const AppComponent  = require('./src/AppComponent').default;
const config        = require('./webpack.dev');

const compiler  = webpack(config);
const app       = express();

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
}));

app.use(hotMiddleware(compiler));

fs.readFile('./index.html', 'utf-8', function(err, data) {
    const template = _.template(data);
    app.use(function(req, res) {
        const context = {};

        const html = template({
            content: ReactDOMServer.renderToString(
                React.createElement(StaticRouter, { context, location: req.url },
                    React.createElement(AppComponent, null, null)
                )
            )
        });

        if (context.url) {
            res.redirect(context.url);
        } else {
            if(context.status) {
                res.status(context.status);
            }
            res.end(html);
        }
    });

    app.listen(3000, function() {
        console.log('Listening on port 3000');
    });
});

