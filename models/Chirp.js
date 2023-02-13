const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Chirp extends Model {}

Chirp.init({

    // property #1
    chirp: {
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            len:[1,240]
        }
    }
},{
    sequelize
});

module.exports=Chirp