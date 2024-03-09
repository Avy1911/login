const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    names: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    }
    ,
    password: {
        type: String,
        required: true,

    },
    roles: {
        type: String,
        enums: ['stundent', 'teacher', 'visitor']

    }

})

module.exports = mongoose.model('user', userSchema)