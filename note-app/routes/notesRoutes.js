const express = require('express')
const notesRouter = express.Router()
const Notes = require('../models/notes')
const User = require('../models/user')

notesRouter.post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const note = new Notes(req.body)
    note.save((err, newNote) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(newNote)
    })
})

notesRouter.get('/', (req, res, next) => {
    Notes.find()
        .populate('user')
        .then(note => {
            return res.status(200).send(note)
        })
        .catch(err => console.log(err))
})

notesRouter.get('/:userId', (req, res, next) => {
    Notes.find({ user: req.auth._id }, (err, note) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(note)
    })
})

notesRouter.get('/:notesId', (req,res,next) =>{
    Notes.findById(req.params.notesId, (err, note) =>{
       if(err){
        res.status(500)
        return next(new Error('nothing was found'))
       } 
       return res.status(200).send(note)
    })
})

notesRouter.put('/:notesId', (req, res, next) => {
    Notes.findByIdAndUpdate({
        _id: req.params.notesId, user: req.auth._id
    },
        req.body,
        { new: true }
    )
        .populate('user')
        .exec((err, updatedNote) => {
            if (err) {
                res.status(500)
                return next(new Error('this is an error'))
            }
            return res.status(200).send(updatedNote)
        })
})

notesRouter.delete('/:notesId', (req,res,next) =>{
    Notes.findByIdAndDelete({_id: req.params.notesId, user: req.auth._id}, (err, deletedNote) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted ${deletedNote.title}`)
    })
})

module.exports = notesRouter