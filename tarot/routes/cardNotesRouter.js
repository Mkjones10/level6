const express = require('express')
const cardsRouter = express.Router()
const Cards = require('../models/Cards')

cardsRouter.get('/', (req,res,next)=>{
    Cards.find((err, card) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(card)
    })
})

cardsRouter.get('/:_id', (req, res, next) => {
    Cards.findById({_id: req.params._id}, (err, foundCard) =>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(foundCard)
    })

})

module.exports = cardsRouter