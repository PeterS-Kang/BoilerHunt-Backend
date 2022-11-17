const mongoose = require('mongoose')

const Schema = mongoose.Schema

const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location