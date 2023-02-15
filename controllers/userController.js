// Sunday February 12, 2023
// first modularized route file

const express = require('express');
const router = express.Router();
const {User, Chirp} = require('../models');

// Adding bcrypt when forming the user login route
const bcrypt = require('bcrypt')

router.get("/", (request, response)=>{

    // returns all the user data
    User.findAll()
    
    // then we take the user data and send it back
    .then(userData=>{
        response.json(userData)
    })
    
    // if there is an error we will log it
    .catch(error=>{
        console.log(error);

        // errors will include a 500 status
        response.status(500)
        
        // a json message is returned
        .json({msg:"oh noes!", error})
    })
})

// logout route
// This route must come before the routes with parameters 
// The logout route will find the rout with the user id which is the parameter of /:id
// A route with a parameter is ("/:id")
router.get("/logout", (request, response)=>{
    // This will destroy the cookie
    // The cookie is where the login information for the user is stored
    // Deleting the cookie will destroy the user log in data in the cookie
    request.session.destroy();

    response.send("User has logged out")
})


// February 13 2023
// Get route for one user email
// References zoom recording February 3, 2023 @ 1:58:03
router.get("/email/:id", (request, response)=>{

    // The parameter we are looking for is request.params.id
    // the method findByPk is find by primary key
    User.findByPk(request.params.id, {
        
        // this is an options object area
        // that is also available with the method findAll()
        attributes:["email"]

    })
    
    // then we take the user data and send it back
    .then(userData=>{
        response.json(userData)
    })
    
    // if there is an error we will log it
    .catch(error=>{
        console.log(error);

        // errors will include a 500 status
        response.status(500)
        
        // a json message is returned
        .json({msg:"oh noes!", error})
    })
})

// Get route for one user
// Joins the users table and the chirps table
// References zoom recording February 3, 2023 @ 1:58:03
router.get("/:id", (request, response)=>{

    // The parameter we are looking for is request.params.id
    // the method findByPk is find by primary key
    User.findByPk(request.params.id, {
        
        // this option
        // will join the Chirp table with the user table
        include:[Chirp]

    })
    
    // then we take the user data and send it back
    .then(userData=>{
        response.json(userData)
    })
    
    // if there is an error we will log it
    .catch(error=>{
        console.log(error);

        // errors will include a 500 status
        response.status(500)
        
        // a json message is returned
        .json({msg:"oh noes!", error})
    })
})

// route to add a user
router.post("/", (request, response)=>{

    // create a user
    User.create({
        
        //a post request includes a request body
        // every user is going to have an email
        // when we make a request into the body of the request
        // we will include an email
        email:request.body.email,

        // when we make a request into the body of the request
        // we will include an password
        password:request.body.password

    })
    
    // then we take the user data and send it back
    .then(userData=>{
        response.json(userData)
    })
    
    // if there is an error we will log it
    .catch(error=>{

        // creates a descriptive error message
        // \x1B[33m yellow text 
        // \x1B[36m cyan text 
        // \x1b[0m resets color
        console.log("\x1B[33m----------------------------------------------")
        console.log("\x1B[36mPost request error:", error.errors[0].message);
        console.log("\x1B[33m----------------------------------------------\x1b[0m")
        // errors will include a 500 status
        
        
        // reset color
        response.status(500)
       
        // a json message is returned
        .json({msg:"oh noes!", error})
    })
})

// login route
router.post("/login", (request, response)=>{
    // Find one user where the email entered is equal to the email in the body
    User.findOne({
        where:{
        email:request.body.email
        }
    })
    .then(userData=>{
        // Check if an Email was found
        // If no email was found on this login return an error
        if(!userData){
            // The 401 route means unauthorized
            return response.status(401).json({msg:"incorrect email"})
        } else {
            // After unencrpyting the data
            // Did the password that was entered, matches the stored password
            if(bcrypt.compareSync(request.body.password, userData.password)){
                // tell sessions that you have logged in
                request.session.userId = userData.id;

                // adds an email property to sessions and checks email
                request.session.userEmail = userData.email;

                // If the password matches, return with user data
                return response.json(userData)
            // If the password does not match, return this 401 error
            } else {
                return response.status(401).json({msg:"incorrect password"})
            }
        }
        response.json(userData)
    })
    .catch(error=>{
        console.log("\x1B[33m----------------------------------------------")
        console.log("\x1B[36mPost request error:", error.message);
        console.log("\x1B[33m----------------------------------------------\x1b[0m")
        response.status(500)
        .json({msg:"oh noes!", error})
    })
})


module.exports = router;
