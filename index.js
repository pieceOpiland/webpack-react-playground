const fs = require('fs');
const path = require('path');

require('babel-polyfill');
require('babel-register');

const express           = require('express');
const _                 = require('lodash');
const React             = require('react');
const ReactDOMServer    = require('react-dom/server');
const StaticRouter      = require('react-router').StaticRouter;

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
    app.use('/dist/bundle.js', function(req, res) {
        res.sendFile(path.resolve('./dist/bundle.js'));
    });

    app.use('/dist/main.css', function(req, res) {
        res.sendFile(path.resolve('./dist/main.css'));
    });
}

fs.readFile('./index.html', 'utf-8', function(err, data) {
    const template = _.template(data);
    app.use(function(req, res) {

        if(process.env.NODE_ENV !== 'production') {
            const cache = require.cache;
            const srcPath = path.resolve(__dirname, 'src');
            for(const key in cache) {
                if(cache.hasOwnProperty(key) && key.startsWith(srcPath)) {
                    delete cache[key];
                }
            }
        }

        const AppComponent = require('./src/AppComponent').default;
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

    app.listen(process.env.PORT || 3000, function() {
        console.log('Listening on port ' + (process.env.PORT || 3000) );
    });
});

