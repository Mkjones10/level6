const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true

    },
    email:{
        type: String,
        lowercase: true
    },
    password:{
        type:String,
        required:true
    },
    memberSince:{
        type: Date,
        default:Date.now
    }, 
    isAdmin:{
        type: Boolean,
        default:false

    },
    firstName: String,
    lastName: String
    
})
module.exports = mongoose.model("User", userSchema)