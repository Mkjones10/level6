const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    arcana: {
        type: String,
        required: true
    },
    suit: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: true
    },
    light: {
        type: String
    },
    dark: {
        type: String
    }
})

module.exports = mongoose.model('Cards', cardsSchema)