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

router.post("/", (request, response)=>{
    Chirp.create({
        chirp:request.body.chirp,

        // The UserId is an auto generated foreign key
        // Created by the associations declared in the index.js at models
        UserId:request.body.UserId

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
})

module.exports = router;