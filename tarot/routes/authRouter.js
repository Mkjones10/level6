const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

authRouter.post('/signup',(req,res,next)=>{
    // console.log('body', req?.body?.username)
    User.findOne({username: req?.body?.username?.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error("That username is already taken"))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.toObject(),process.env.SECRET )
            return res.status(200).send({token, user:savedUser})
        })
    })
})
authRouter.post('/login',(req, res, next)=>{
    User.findOne({username:req.body.username.toLowerCase()},(err, user) =>{
        console.log(req.body)
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error('Username or password are incorrect, try again'))
        }
        if(req.body.password !== user.password){
            res.status(403)
            return next(new Error('Username or password are incorrect, try again'))
        }
        const token = jwt.sign(user.toObject(),process.env.SECRET )
        return res.status(200).send({token, user})
    })
})

module.exports = authRouter