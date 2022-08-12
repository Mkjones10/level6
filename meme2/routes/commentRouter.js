const express = require('express')
const commentsRouter = express.Router()
const Comments = require('../models/comments')
const User = require('../models/user')
const Meme = require('../models/meme')

commentsRouter.post('/:memeId', (req, res, next) => {
    let memeId = req.params.memeId
    req.body.user = req.auth._id
    req.body.meme = memeId
    const comments = new Comments(req.body)
    comments.save((err, newComments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(newComments)
    })
})

commentsRouter.get('/', (req, res, next) => {
    Comments.find((err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

commentsRouter.get('/:memeId', (req,res,next) =>{
    Comments.find({meme: req.params.memeId}, (err, comments) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})

module.exports = commentsRouter