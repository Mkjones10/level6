const { ObjectId } = require('bson')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const readingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    date: {
        type: Date,
        default:Date.now
    },
    number: {
        type: Number,
        default: 1
    },
    notes: {
        type: String
    },
    // cards: [{
    //     cardId: {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Cards',
    //         required: true
    //     },
    //     name: {
    //         type: String,
    //         required: true

    //     },
    //     meaning: {
    //         type: String,
    //         required: true
    //     },
    //     isReversed: {
    //         type: Boolean,
    //         required: true
    //     }
    // }]
    

})

module.exports = mongoose.model('Reading'. readingSchema)