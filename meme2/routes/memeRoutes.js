const express = require('express')
const memeRouter = express.Router()
const Meme = require('../models/meme')
const jwt = require('jsonwebtoken')


memeRouter.get('/', (req, res, next) => {
    Meme.find()
        .populate('user')
        .then(memes => {
            return res.status(200).send(memes)
        })
        .catch(err => console.log(err))
})

memeRouter.post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const meme = new Meme(req.body)
    meme.save((err, newMeme) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(newMeme)
    })
})

memeRouter.get('/:userId/', (req, res, next) => {
    console.log(req.params.userId, "for User", req.auth._id)
    Meme.find({ user: req.auth._id }, (err, memes) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        console.log('memes', memes)
        return res.status(200).send(memes)
    })
})
memeRouter.put('/:memeId', (req, res, next) => {
    Meme.findByIdAndUpdate(
        { _id: req.params.memeId, user: req.auth._id },
        req.body,
        { new: true }

    )
        .populate('user')
        .then((err, updatedMeme) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedMeme)
        })
})

memeRouter.put('/upVotes/:memeId', (req, res, next) => {
    Meme.findById(req.params.memeId, (err, meme) => {
        const upvoteExists = Array.from(meme.upVotes).find(upvote => String(upvote.user) === req.auth._id)

        const downvoteExists = Array.from(meme.downVotes).find(downvote => String(downvote.user === req.auth._id))

        if (!upvoteExists && !downvoteExists) {
            meme.upVotes.push({ user: req.auth._id })
            meme.votesTotal++

            meme.save(err => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(meme)
            })
        }
        else if (downvoteExists) {
            meme.upVotes.push({ user: req.auth._id })
            meme.votesTotal += 2
            meme.save(err => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(meme)
            })
        }
        else if (upvoteExists) {
            meme.upVotes.id(upvoteExists._id).remove()
            meme.votesTotal--
            meme.save(err => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(meme)
            })
        }
        else {
            return res.status(200).send(meme)
        }
    })
})

memeRouter.put('/downVotes/:memeId', (req, res, next) => {
    Meme.findById(req.params.memeId, (err, meme) => {
        const upvoteExists = Array.from(meme.upVotes).find(upvote => String(upvote.user) === req.auth._id)

        const downvoteExists = Array.from(meme.downVotes).find(downvote => String(downvote.user === req.auth._id))

        if (!downvoteExists && !upvoteExists) {
            meme.downVotes.push({ user: req.auth._id })
            meme.votesTotal--

            meme.save(err => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(meme)
            })
        }
        else if (upvoteExists) {
            meme.upVotes.id(upvoteExists._id).remove()
            meme.downVotes.push({ user: req.auth._id })
            meme.votesTotal -= 2
            meme.save(err => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(meme)
            })
        }
        else if (downvoteExists) {
            meme.downVotes.id(downvoteExists._id).remove()
            meme.votesTotal++
            meme.save(err => {
                if (err) {
                    res.status(500)
                    return next(err)
                }
                return res.status(200).send(meme)
            })
        }
        else {
            return res.status(200).send(meme)
        }
    })
})

memeRouter.delete('/:memeId', (req, res, next) => {
    Meme.findByIdAndDelete({ _id: req.params.memeId, user: req.auth._id }, (err, deletedMeme) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfullt deleted meme: ${deletedMeme.topText}`)
    })
})

module.exports = memeRouter