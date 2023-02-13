const express = require('express');
const router = express.Router();

// connects the router to userController routes
const userRoutes= require('./userController');
router.use("/api/users", userRoutes);

// connects the router to chirpController routes
const chirpRoutes = require('./chirpController');
router.use("/api/chirps", chirpRoutes);

module.exports = router;
