const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/portfolio', ()=> console.log('connected to database'))

const bodyParser =require('body-parser')
app.use(bodyParser.json())
app.use('/project', require('./routes/projectRoutes'))

app.use((err, req,res,next)=>{
    console.log(err)
    return res.send({errMsg:err.message})
})

app.listen(9000, ()=>{
    console.log('welcome!')
})