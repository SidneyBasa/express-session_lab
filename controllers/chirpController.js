// Sunday February 12, 2023
const express = require('express');
const router = express.Router();
const {User, Chirp} = require('../models');

// find all chirp data and send it back
router.get("/", (request, response)=>{
    Chirp.findAll()
    .then(chripData=>{
        response.json(chripData)
    })
    .catch(error=>{
        console.log(error);
        response.status(500)
        .json({msg:"oh noes!", error})
    })
})

// February 13 2023 @ 11:47am
// Get one chirp
router.get("/:id", (request, response)=>{
    Chirp.findByPk(request.params.id,{
        include:[User]
    })
    .then(chripData=>{
        response.json(chripData)
    })
    .catch(error=>{
        console.log(error);
        response.status(500)
        .json({msg:"oh noes!", error})
    })
})

// route to create a chirp
router.post("/", (request, response)=>{
    
    // Route protection shell
    if(request.session.userId) {
           Chirp.create({
        
            chirp:request.body.chirp,
    
            // Attaches the userId stored in sessions to the UserId of the chirp json data
            UserId:request.session.userId
    
        }).then(chripData=>{
            response.json(chripData)
        })
        .catch(error=>{
            console.log("\x1B[33m----------------------------------------------")
            // console.log("\x1B[36mPost request error:", error.errors[0].message);
            console.log(error);
            console.log("\x1B[33m----------------------------------------------\x1b[0m")
            response.status(500).json({msg:"oh noes!", error})
        })

    } else {
        return response.status(403).json({msg:"You must login or sign up to create a chirp"})
    }
    



})


module.exports = router;