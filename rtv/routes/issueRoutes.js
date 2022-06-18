const express = require('express')
const issueRouter = express.Router()
const Issue = require('../models/issue')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

issueRouter.get('/', (req, res, next) => {
    Issue.find()
        .populate('user')
        .then(issues => {
            return res.status(200).send(issues)
        })
        .catch(err => console.log(err))

})

issueRouter.post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const issue = new Issue(req.body)
    issue.save((err, newIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(newIssue)
    })

})



issueRouter.get('/:userId', (req, res, next) => {
    console.log('in issue Router', req.params.userId)
    Issue.find({ user: req.auth._id }, (err, issues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        console.log('issues', issues)
        return res.status(200).send(issues)
    })
})

// issueRouter.get('/:userId', (req, res, next) => {
//     Issue.findById(req.params.userId, (err, issues) => {
//         if (err) {
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(issues)
//     })
// })

issueRouter.get('/:issueId', (req, res, next) => {
    Issue.findById(req.params.issueId, (err, issue) => {
        if (err) {
            res.status(500)
            return next(new Error('No issues were found'))

        }
        return res.status(200).send(issue)
    })
})
issueRouter.put('/:issueId', (req, res, next) => {
    Issue.findByIdAndUpdate(
        { _id: req.params.issueId, user: req.auth._id },
        req.body,
        { new: true },
       

    )
    .populate("user")
    .then ((err, updatedIssue) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(updatedIssue)
    })
    .catch(err => console.log(err))
})


issueRouter.put("/upVotes/:issueId", (req, res, next) => {
    // console.log('userid', req.body.userId)
    // find the issue
    Issue.findById(req.params.issueId, (err, issue) =>{
        // append the  upvote to the array
        const exists = Array.from(issue.upVotes).find(upvote =>
            String(upvote.user) === req.auth._id
        )
        const downvoteExist = Array.from(issue.downVotes).find(downvote => 
            String(downvote.user === req.auth._id)
        )
        // if(exists && downvoteExist) {
        //     return res.status(201).send(issue)
        // }
        if(!exists && !downvoteExist) {
            console.log(req.auth)
            issue.upVotes.push({user: req.auth._id})
            issue.votesTotal++
        // save the issue
            issue.save(err => {
             if(err){
                    res.status(500)
                    return next(err)
             }
               return res.status(201).send(issue)
            })
        //  send it back to the client
        } else if(downvoteExist){
            console.log(req.auth)
            issue.downVotes.id(downvoteExist._id).remove()
            issue.upVotes.push({user: req.auth._id})
            issue.votesTotal += 2
            issue.save(err => {
                if(err){
                       res.status(500)
                       return next(err)
                }
                  return res.status(201).send(issue)
            })
        } else if(exists){
            console.log(req.auth)
            issue.upVotes.id(exists._id).remove()
            issue.votesTotal--
            issue.save(err => {
                if(err){
                       res.status(500);
                       return next(err);
                }
                  return res.status(201).send(issue)
            })
        } else {
            return res.status(201).send(issue)
        }
    })
});


issueRouter.put("/downVotes/:issueId", (req, res, next) => {
     // console.log('userid', req.body.userId)
    // find the issue
    Issue.findById(req.params.issueId, (err, issue) =>{
        // append the  upvote to the array
        const exists = Array.from(issue.downVotes).find(downvote =>
            String(downvote.user) === req.auth._id
        )
        const upvoteExist = Array.from(issue.upVotes).find(upvote => 
            String(upvote.user === req.auth._id)
        )
        // if(exists && downvoteExist) {
        //     return res.status(201).send(issue)
        // }
        if(!exists && !upvoteExist) {
            issue.downVotes.push({user: req.auth._id})
            issue.votesTotal--
        // save the issue
            issue.save(err => {
             if(err){
                    res.status(500)
                    return next(err)
             }
               return res.status(201).send(issue)
            })
        //  send it back to the client
        } else if(upvoteExist){
            issue.upVotes.id(upvoteExist._id).remove()
            issue.downVotes.push({user: req.auth._id})
            issue.votesTotal -= 2
            issue.save(err => {
                if(err){
                       res.status(500)
                       return next(err)
                }
                  return res.status(201).send(issue)
            })
        } else if(exists){
            issue.downVotes.id(exists._id).remove()
            issue.votesTotal++
            issue.save(err => {
                if(err){
                       res.status(500);
                       return next(err);
                }
                  return res.status(201).send(issue)
            })
        } else {
            return res.status(201).send(issue)
        }
    })
})




issueRouter.delete("/:issueId", (req, res, next) => {
    Issue.findByIdAndDelete({ _id: req.params.issueId, user: req.auth._id },
        (err, deletedIssue) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(`Successfully deleted Issue: ${deletedIssue.title}`)
        })
})


module.exports = issueRouter