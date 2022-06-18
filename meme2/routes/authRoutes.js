const express = require('express')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
authRouter.post('/signup', (req, res, next) => {
    User.findOne({ username: req?.body?.username.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        if (user) {
            res.status(403)
            return next(new Error('that username is already taken '))
        }
        const newUser = new User(req.body)
        newUser.save((err, savedUser) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ token, user: savedUser.withoutPassword() })
        })
    })
})

authRouter.post('/login', (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        console.log(req.body)
        if (err) {
            res.status(500)
            return next(err)
        }

        if (!user) {
            res.status(403)
            return next(new Error('That username or password is incorrect, try again'))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if (err) {
                res.status(403)
                return next(new Error('username or password is incorrect try again'))
            }
            if (!isMatch) {
                res.status(403)
                return next(new Error('username or password is incorrect, try again'))
            }
            const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
            return res.status(200).send({ token, user: user.withoutPassword() })
        })

    })
})

module.exports = authRouter