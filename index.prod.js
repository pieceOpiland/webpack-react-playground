const fs = require('fs');

const _ = require('lodash');

module.exports = function(app, consumer) {
    fs.readFile('./index.html', 'utf-8', function(err, data) {
        const template = _.template(data);
        app.use(function(req, res) {
            consumer(req, res, template);
        });
    });
};
