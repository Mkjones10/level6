const mongoose = require('mongoose')
const Schema = mongoose.Schema
const memeSchema = new Schema({
    topText:{
        type:String,
        required:true
    },
    bottomText:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
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
    }
})
module.exports = mongoose.model('Meme', memeSchema)