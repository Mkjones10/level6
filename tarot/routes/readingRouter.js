const express = require('express')
const readingRouter = express.Router()
const Reading = require('../models/Reading')

readingRouter.get('/', (req,res,next) =>{
    Reading.find((err, reading) => {
        if(err){
            res.status(500)
            return next(err)
        }
        res.status(200).send(reading)
    })
})

readingRouter.get('/:userId', (req,res,next)=> {
    Reading.find({user: req.auth._id}, (err, foundReadings) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundReadings)
    })
})

readingRouter.post('/', (req, res, next) => {
    const newReading = new Reading(req.body)
    newReading.save((err, newReading) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newReading)
    })
})

readingRouter.delete('/:readingId', (req, res, next) => {
    Reading.findByIdAndDelete({readingId : req.params.readingId}, (err, deleatedReading)=> {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send('Successfully deleted reading!')
    })
})

readingRouter.put('/:readingId', (req, res, next) =>{
    Reading.findOneAndUpdate(
        {readingId: req.params.readingId},
        req.body,
        {new:true},
        (err, updatedReading) =>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(updatedReading)
        }
    )
})

module.exports = readingRouter