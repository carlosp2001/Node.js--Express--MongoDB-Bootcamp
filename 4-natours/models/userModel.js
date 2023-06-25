const mongoose = require('mongoose');
const validator = require('validator');

// name , email, photo, password, passwordConfirm

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true, // Simplemente convierte el correo a lowercase no es un validador
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    photo: String,
    password: {
        type: String,
        require: [true, 'Please provide a password'],
        minlength: 8,
    },
    passwordConfirm: {
        type: String,
        require: [true, 'Please confirm your password'],
    },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
