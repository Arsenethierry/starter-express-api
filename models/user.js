const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 200,
        unique: true
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 200,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 1024,
    }
})

const User = mongoose.model('User', userSchema)

exports.User = User