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
        console.log(error);

        // errors will include a 500 status
        response.status(500)
        
        // a json message is returned
        .json({msg:"oh noes!", error})
    })
})

module.exports = router;
