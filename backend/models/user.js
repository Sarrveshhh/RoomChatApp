const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fname: {type: String},
    lname: {type: String},
    email: {type: String},
    room: {type: String, required: true},
})

module.exports = mongoose.model('User', userSchema);