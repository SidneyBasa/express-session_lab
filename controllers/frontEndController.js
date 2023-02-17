// Wednesday February 16 2023
const express = require('express');
const router = express.Router();
const {User, Chirp} = require('../models');

// first view
// homepage
// first route
router.get("/", (request, response)=>{
    response.render("home")
})

module.exports = router;