const mongoose = require('mongoose')
const Schema = mongoose.Schema
const subjectsSchema = new Schema({
    body:{
        type:String,
        required: true
    },
    notes:{
        type: Schema.Types.ObjectId,
        ref:"Notes",
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
})

module.exports = mongoose.model("Subject", subjectsSchema)