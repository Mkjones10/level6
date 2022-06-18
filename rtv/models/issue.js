const mongoose = require('mongoose')
const Schema = mongoose.Schema
const issueSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    imgUrl:{
        type: String
    },
    createdAt:{
        type: Date,
        default:Date.now
    },
    upVotes:[{
        user: {
            type: Schema.Types.ObjectId
        }
    }],
    downVotes:[{
        user: {
            type: Schema.Types.ObjectId
        }
    }],
    votesTotal: {
        type: Number,
        default: 0
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    
})
module.exports = mongoose.model('Issue', issueSchema)