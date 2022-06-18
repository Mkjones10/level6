const express = require('express')
const projectRouter = express.Router()
const Project = require('../models/projects.js')
projectRouter.route('/')
    .get((req, res, next) => {
        Project.find((err, project) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(project)
        })
    })

    .post((req, res, next)=>{
        const newProject = new Project(req.body)
        console.log(req.body)
        newProject.save((err, savedProject)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).send(savedProject)
        })
    })

projectRouter.get('/:projectId',(req, res, next)=>{
    const projectId = req.params.projectId
  Project.findById(projectId,(err, project)=>{
      if(err){
          res.status(500)
          return next(err)
      }
      return res.status(200).send(project)
  })
})

projectRouter.delete('/:projectId',(req, res, next)=>{
    Project.findOneAndDelete(req.params.projectId, (err, deletedProject)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`successfully deleted ${deletedProject.title}`)
    })
})

projectRouter.put('/:projectId',(req, res, next)=>{
    Project.findByIdAndUpdate(req.params.projectId, req.body, {new:true},(err, updateProject)=>{
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(updateProject)
    })
})
module.exports = projectRouter