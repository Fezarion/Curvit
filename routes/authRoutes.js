const passport = require("passport");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const { androidClientID, jwtSecret } = require("../config/keys");

const mongoose = require("mongoose");

const User = mongoose.model("users");

/**
 * Authenticaiton routes.
 */
module.exports = app => {
    app.get("/auth/current_user", (req, res) => {
        if (req.user) {
            const { name, displayName, email } = req.user;
            res.send({
                name,
                displayName,
                email
            });
        } else {
            res.send(false);
        }
    });

    // Google Auth Route, used by web for authentication.
    app.get(
        "/auth/google",
        passport.authenticate("google", {
            scope: ["profile", "email"],
            prompt: "select_account"
        })
    );

    // Google Auth Callback Route, used by web for authentication.
    app.get(
        "/auth/google/callback",
        passport.authenticate("google"),
        (req, res) => {
            res.redirect("/");
        }
    );

    // Logout Route, used by web to remove cookies for user.
    app.get("/auth/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    });

    // Google Auth Route, used by mobile for authentication.
    app.post("/auth/google/mobile", async (req, res) => {
        try {
            // Pull user information from req.body.
            const { idToken, displayName, name, email } = req.body;
            const client = new OAuth2Client(androidClientID);

            // Verify idToken with google.
            const ticket = await client.verifyIdToken({
                idToken,
                androidClientID
            });

            // Extract the user's googleId.
            const payload = ticket.getPayload();
            const googleId = payload["sub"];

            // Find user with the matching google id.
            const user = await User.findOne({
                googleId
            });

            // If user doesn't exist, create one.
            if (!user) {
                user = await new User({
                    googleId,
                    displayName,
                    name,
                    email
                }).save();
            }

            // Create signed jwt.
            const token = jwt.sign({ userId: user.id }, jwtSecret);

            // Send jwt back to the mobile app to store for future requests.
            res.send({ token });
        } catch (error) {
            return res
                .status(401)
                .send({ error: `Authentication error, ${error}` });
        }
    });
};
