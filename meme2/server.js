const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
app.use(morgan('dev'))
require('dotenv').config()
const { expressjwt: jwt } = require("express-jwt")


app.use(bodyParser.json())
mongoose.connect('mongodb://localhost:27017/meme', ()=> console.log('connected to database'))
app.use('/auth', require('./routes/authRoutes'))
app.use("/api", jwt( {secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/meme/', require('./routes/memeRoutes'))
app.use('/api/comments/', require('./routes/commentRouter'))

app.use((err,req,res,next)=>{
    console.log(err)
    if(err.name ==='UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({message:err.message})
})

app.listen(8000, ()=>{
    console.log('hello ')
})