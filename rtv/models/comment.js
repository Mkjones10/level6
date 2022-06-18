const mongoose = require('mongoose')
const Schema = mongoose.Schema
const commentSchema = new Schema({
    body:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default:Date.now
    },
    issue:{
        type: Schema.Types.ObjectId,
        ref:"Issue",
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})
module.exports = mongoose.model("Comment", commentSchema)