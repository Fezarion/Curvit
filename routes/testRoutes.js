const requireLogin = require("../middlewares/requireLogin");

/**
 * Test routes for debugging.
 */
module.exports = app => {
    // Basic test.
    app.get("/test", (req, res) => {
        res.send({ test: "hello world" });
    });

    // Test requireLogin.
    app.get("/test/login", requireLogin, (req, res) => {
        res.send({ authenticated: true });
    });

    // Check the current logged in user.
    app.get("/test/current_user", (req, res) => {
        res.send(req.user);
    });
};
