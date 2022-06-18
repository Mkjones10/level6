const express = require('express')
const userRouter = express.Router()
const User = require('../models/User')

userRouter.get('/', (req, res, next) =>{
    User.find((err, foundUsers) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        if(!foundUsers){
            res.status(403)
            return next(new Error('no users found'))
        }
        return res.status(200).send(foundUsers)
    })
})

userRouter.get('/:userId', (req, res, next) =>{
    User.findById({userId : req.auth.userId}, (err, foundUser) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        if(!foundUser){
            res.status(403)
            return next(new Error('user ws not found'))
        }
        return res.status(200).send(foundUser)
    })
})

userRouter.put('/:userId', (req, res, next) =>{
    User.findOneAndUpdate(
        {userId: req.auth.userId},
        req.body,
        {new: true},
        (err, updatedUser) =>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedUser)
        }
    )
})

module.exports = userRouter