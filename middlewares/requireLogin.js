const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");

/**
 * Middleware to check if the user has been authenticated.
 */
module.exports = (req, res, next) => {
    if (req.user) {
        // The request is coming from web.
        res.locals.userId = req.user.id;
        return next();
    } else if (req.headers.authorization) {
        // The request is coming from mobile.
        res.locals.userId = jwt.verify(
            req.headers.authorization.replace("Bearer ", ""),
            jwtSecret
        ).userId;
        return next();
    } else {
        // The user has not logged in.
        return res.status(401).send({ error: "Please login and try again." });
    }
};
