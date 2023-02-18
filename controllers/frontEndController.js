// Wednesday February 16 2023
const express = require('express');
const router = express.Router();
const {User, Chirp} = require('../models');

// first view
// homepage
// first route
router.get("/", (request, response)=>{
    Chirp.findAll().then(chirpData=>{
        console.log(chirpData)
        // adding data to the homepage
        // joeIsCool: true,
        // cat:"asleep"
        
        // Taking the raw data
        // And placing it in a form that handlebars can read
        // Takes the property chirp which is defined in the model Chrip at chirp.js 
        // and converts it into json format
        const handlebarChirps = chirpData.map(chirp=>chirp.toJSON())
                // After the map method converts chirpData to json
                // place it into the allChirps key to pass into views 
                console.log("value of handlebarChirps", handlebarChirps)
                response.render("home",{
                allChirps:handlebarChirps
        })
    })
})

// login route
router.get("/login", (request, response)=>{
    response.render("login")
})

// signup route
router.get("/signup", (request, response)=>{
    response.render("signup")
})

// profile route
router.get("/profile", (request, response)=>{
    response.render("profile")
})

module.exports = router;