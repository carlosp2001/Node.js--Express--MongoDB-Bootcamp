const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
        select: false,
    },
    passwordConfirm: {
        type: String,
        require: [true, 'Please confirm your password'],
        validate: {
            // This only work on CREATE AND SAVE!!!
            validator: function (el) {
                return el === this.password; // abc === abc
            },
            message: 'Passwords are not the same!',
        },
    },
    passwordChangedAt: Date,
});

// Este hook sucede entre conseguir los datos y guardarlos en la base de datos
userSchema.pre('save', async function (next) {
    // Only runs this function if password was actually modified
    if (!this.isModified) return next();

    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

// Un metodo instante estará disponible en todos los documentos de una cierta coleccion
userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        console.log(changedTimestamp, JWTTimestamp);
        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT change
    return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
