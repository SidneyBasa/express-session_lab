// Sunday February 12, 2023
// first modularized route file

const express = require('express');
const router = express.Router();
const {User, Chirp} = require('../models');

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



module.exports = router;
