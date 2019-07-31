const fs = require('fs');
const path = require('path');

const _ = require('lodash');

module.exports = function(app, consumer) {

    const cache = require.cache;
    const srcPath = path.resolve(__dirname, 'src');
    for(const key in cache) {
        if(key.startsWith(srcPath)) {
            delete cache[key];
        }
    }

    app.use(function(req, res) {
        fs.readFile('./index.html', 'utf-8', function(err, data) {
            consumer(req, res, _.template(data));
        });
    });
};
