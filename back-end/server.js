const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

mongoose.connect('mongodb://localhost:27017/cooking-blog', {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: [
        'secretValue'
    ],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// import the users module and setup its API path
const recipes = require("./recipes.js");
app.use("/api/recipe", recipes.routes);

const users = require("./users.js");
app.use("/api/users", users.routes);

const comments = require("./comments.js");
app.use("/api/recipe/comments", comments.routes);

app.listen(3002, () => console.log('Server listening on port 3002!'));