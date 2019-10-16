const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
const bodyParser = require("body-parser");
require("./models/User");
require("./models/CV");
require("./services/passport");

// Connect to mongoDB database.
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

// Parse body from POST requests
app.use(bodyParser.json());

// Create cookie sessions for web.
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

// Initialize passport session.
app.use(passport.initialize());
app.use(passport.session());

// All the routes the server handles.
require("./routes/authRoutes")(app);
require("./routes/cvRoutes")(app);

if (process.env.NODE_ENV === "production") {
    // Express will serve up production assets
    // like main.js or main.css file
    app.use(express.static("client/build"));

    // Express will serve up index.html
    // If it doesn't recognize the route
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
} else {
    // Include test routes if in dev mode
    require("./routes/testRoutes")(app);
}

// The port heroku provides or us port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT);

console.log("Server listening on port", PORT);

module.exports = app;
