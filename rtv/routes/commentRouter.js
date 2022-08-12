
const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')
const User = require('../models/user.js')
const Issuee = require('../models/issue')

commentRouter.post('/:issueId', (req,res,next)=>{
    req.body.user = req.auth._id

    let issueId = req.params.issueId
    req.body.issue = issueId
    const comment = new Comment(req.body)
    comment.save((err,newComment)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(newComment)
    })
})
commentRouter.get('/', (req, res, next)=>{
    Comment.find((err, comments)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})


commentRouter.get('/:issueId', (req, res, next)=>{
    console.log('in comment router with issueid')
    Comment.find({issue: req.params.issueId}, (err, comments)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})
module.exports = commentRouter