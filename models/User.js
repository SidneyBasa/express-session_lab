// when calling sequelize for this model
// It is immediately destructure model and DataTypes
const { Model, DataTypes} = require('sequelize');

// error 2 sequelize must be lower case
const sequelize = require('../config/connection');

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
    sequelize
});

// we export this model
module.exports=User