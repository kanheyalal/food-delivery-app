const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: Number,
    }
})

const User = new mongoose.model('User', user);
module.exports = User;