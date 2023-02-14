// February 12 2023 @ 4:23pm
// full stack web application development practice
// Referencing chirpy API
// Referencing zoom recording Tuesday February 7, 2023
// References created by uw code bootcamp instructor Joe Rehfuss

// after npm i express
// imports the express package to this file
const express = require('express');

// imports the express-session package to this file
const session = require('express-session');

// import every route into this root index file
const allRoutes = require('./controllers');

// importing the connection file at config/connection.js
const sequelize = require('./config/connection')

// connects the session to the sequelize database
// Allows a user to be remembered even when the server resets
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// creates an instance of express
const app = express();
// setting the port
// process.env.PORT is the dynamically generated Heroku port
// OR if there is no dynamically generated port, default to 3000
const PORT = process.env.PORT || 3000;

// destructuring User from models,
// avoids writing models.User
// When force sync is engaged, the User table will be created
const { User, Chirp } = require('./models');

// session configuration
// Creates a cookie
// A cookie is a piece of data that gets passed between server and client
// The cookie includes markers that identify the specific client and server
// Allows persmissions for websites, for specific users to access specified areas
const sesh = {
    // this area specifies session options:
    // this is the decryption key, it should be an environment variable
    secret: process.env.SESSION_SECRET,
    // attaches information about the cookie
    // the sessions package, allows usage of session variables, stored in a cookie string
    // can set cookie to expire in the options object
    cookie: {
        // set to expire in a certain amount of time, days
        maxAge:1000*60*60*2
    },
    // resave tells the app when to have the cookie be initialized
    // resave states, if no data is changed, do I resave the data, placed as false
    resave: false,
    // saveUninitialized states, if there's no custom data in it do I still create a cookie?
    saveUninitialized: true,
    // This is telling sequelize to put the session data, into the sequelize datbase
    store: new SequelizeStore({
        db: sequelize
    })
};

// tells this app to uses session with the argument sesh for session options speficied above
app.use(session(sesh))

// express middleware to parse json data
// parse url encoded data
// without these, the app cannot read request.body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// tells this root index file to use all routes
app.use(allRoutes);

// first route
app.get("/", (request, response)=>{
    response.send("hello welcome to chirpy!")
})

// Creating a route for sesions
app.get("/sessions", (request, response)=>{
    response.json(request.session)
})

// Creating a route for color
// When we make a get request to forward slash fave color
// We're going to pass in a parameter called color
app.get("/favcolor/:color",(request, response)=>{
    
    // In this session object
    // We're going to create a favorite color property
    // Because ssession is an object, we can add keys to it
    // We will pass to this key, whatever the user passed in as color
    // This is a demonstration of passing in data to this specific session
    request.session.favColor = request.params.color
    response.json(request.session)
})

// secret club route
app.get("/secretclub", (request, response)=>{
    // check to see if the user has a userId in sessions
    if(request.session.userId) {
        return response.send(`Welcome to the secret club!, ${request.session.userEmail}`)
    } else {
        // otherwise return forbidden status 403
        response.status(403).json({msg:"login first to join the club!"})
    }

    
})

// synchronizing the database before listening to requests
// force true will force the tables to drop its data
sequelize.sync({ force: false}).then(function() {

app.listen(PORT, function(){
    console.log('App listening on PORT' + PORT);
    });

});