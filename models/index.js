const User = require("./User");
const Chirp = require("./Chirp");

// Table associations are located here
Chirp.belongsTo(User,{
    onDelete:"CASCADE"
})

// Setting the User to also equal Chirp
// These two associations are the same as an sql join
User.hasMany(Chirp)


module.exports = {
    // export this object with the key of User
    User,
    Chirp
}