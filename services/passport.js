const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// Serialize user.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from mongodb.
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// Create passport using google strategy.
passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: "/auth/google/callback",
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            // Extract the user's googleId.
            const googleId = profile.id;

            // Find user with the matching google id.
            const user = await User.findOne({
                googleId
            });

            // If user doesn't exist, create one.
            if (!user) {
                user = await new User({
                    googleId,
                    displayName: profile.displayName,
                    name: profile.name,
                    email: profile.emails[0].value
                }).save();
            }

            // Pass the user object to the next middleware.
            done(null, user);
        }
    )
);
