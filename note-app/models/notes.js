const mongoose = require ('mongoose')
const Schema = mongoose.Schema
const notesSchema = new Schema({
    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        default: Date.now
    },
    subject:{
        type:String,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

module.exports = mongoose.model('Notes', notesSchema)