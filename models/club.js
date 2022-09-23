const mongoose = require('mongoose')
const schema = mongoose.Schema
const validator = require('validator')

let clubSchema = new schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email',
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: [6,'Please provide atleast six character length'],
        select: false,
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please provide confirm password'],
        minlength: [6,'Please provide atleast six character length'],
        select: false,
    }
})

module.exports = mongoose.model('student', clubSchema)