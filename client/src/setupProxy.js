const proxy = require('http-proxy-middleware')

/**
 * Sets a proxy for development environment.
 */
module.exports = function (app) {
    app.use(proxy(['/api', '/auth'], {
        target: 'http://localhost:4000'
    }));
}
