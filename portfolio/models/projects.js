const mongoose = require('mongoose')
const Schema = mongoose.Schema
const projectSchema = new Schema({
    title:{
        type:String,
        
    },
    link:{
        type: String,
       

    },
    description:{
        type: String,
        
    }
})
module.exports = mongoose.model('Project', projectSchema)