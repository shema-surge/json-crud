const { Router } = require('express')
const {v4:uuid} = require('uuid')
const {readModel,addModel,updateModel,deleteModel,getModel} = require('../controller/controllerFunctions')
const router = Router()


const model = 'staff'

router.get(`/${model}`,(req,res)=>{
    try{
        res.json(readModel(model))
    }catch(err){
        res.json({message:err.message})
    }
})

router.get(`/${model}/:id`,(req,res)=>{
    try{
        res.json(getModel(model,req.params.id))
    }catch(err){
        res.json({message:err.message})
    }  
})

router.post(`/${model}`,(req,res)=>{
    try{
        const data = {
            id:uuid(),
            name:req.body.name,
            age:req.body.age,
            task:req.body.task
        }
        addModel(model,data)
        res.json(readModel(model))  
    }catch(err){
        res.json({message:err.message})
    }

})

router.put(`/${model}`,(req,res)=>{
    try{
        updateModel(model,req.body)
        res.json(readModel(model))
    }catch(err){
        res.json({message:err.message})
    }

})

router.delete(`/${model}/:id`,(req,res)=>{
    try{
        deleteModel(model,req.params.id)
        res.json(readModel(model))
    }catch(err){
        res.json({message:err.message})
    }
})

module.exports = router