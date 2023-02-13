// when calling sequelize for this model
// It is immediately destructure model and DataTypes
const { Model, DataTypes} = require('sequelize');

// error 2 sequelize must be lower case
const sequelize = require('../config/connection');

// importing bcrypt password encryption package into this file
const bcrypt = require("bcrypt")

class User extends Model {}

// This is what creates the table
// The init method on a sequelize model takes two arguments
// The first argument is the names of the columns of the table
// The second argument is the options, where the only required field is sequelize
User.init({
    // Properties are defined here

    // property #1
    email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate: {
            isEmail:true
        }
    },

    // property #2
    password: {
        type: DataTypes.STRING,
        allowNull:false,

        // constrain the password to have at least 8 characters
        len:[8]
    }

},{
    // error 3 discovered and corrected
    // sequelize must be lowercase at options
    sequelize,

    // on hooks
    // One way to think about hooks is like an event listener
    hooks: {
        // take the input object, in this case the user object
        beforeCreate: userObj=>{

            // set the user objects password to be what was entered as the password
            userObj.password = 

            // bcrypts password encryption method
            bcrypt.hashSync(
                userObj.password,

                // encryption level 4
                // professionally called salt rounds
                4
            )

            // whatever gets returned from this function
            // is the record that gets saved to the database
            return userObj;
        } 
    }
});

// we export this model
module.exports=User