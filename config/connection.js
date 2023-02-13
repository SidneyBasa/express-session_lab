// February 12 2023 @ 5:03pm
// full stack web application development practice
// Referencing chirpy API
// Referencing zoom recording Tuesday February 7, 2023
// minute 1:11:03
// References created by uw code bootcamp instructor Joe Rehfuss

// importing the sequelize package in this file
const Sequelize = require('sequelize');
// importing a package called dotenv for environment variables
require('dotenv').config();
// creating a global variable called lower case sequelize
let sequelize;
// if we are in Heroku with a Jaws DB instance
if (process.env.JAWSDB_URL) {
    // we connect to our Jaws database
    sequelize  = new Sequelize(process.env.JAWSDB_URL);
    // otherwise we will connect to our local database
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            // depending on your node version / processor
            // you may have to change local host to
            // 127.0.0.1
            host:'localhost',
            dialect:'mysql',

            // This was a bug, because port was mistakenly set to 3006
            // 6:30pm
            port: 3306
        }
    );
}

// exporting the variable sequelize to the module 
module.exports = sequelize;