// February 12 2023 @ 4:23pm
// full stack web application development practice
// Referencing chirpy API
// Referencing zoom recording Tuesday February 7, 2023
// References created by uw code bootcamp instructor Joe Rehfuss

// after npm i express
// imports the express package to this file
const express = require('express');

// importing the connection file at config/connection.js
const sequelize = require('./config/connection')

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

// first route
app.get("/", (request, response)=>{
    response.send("hello welcome to chirpy!")
})

// synchronizing the database before listening to requests
// force true will force the tables to drop its data
sequelize.sync({ force: true}).then(function() {

app.listen(PORT, function(){
    console.log('App listening on PORT' + PORT);
    });

});