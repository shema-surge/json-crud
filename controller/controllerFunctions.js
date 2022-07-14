const fs = require('fs')

function write(path,array){
    fs.writeFileSync(path,JSON.stringify(array))
}

function readModel(model){
    let path = __dirname+`/../db/${model}.json`
    let data = fs.readFileSync(path,'utf-8')
    if(data){
        return JSON.parse(data)
    }else{
        return null
    }
}

function addModel(model,data){
    let path = __dirname+`/../db/${model}.json`
    let modelArray = []
    if(readModel(model)){
        modelArray = [...readModel(model),data]
    }else{
        modelArray.push(data)
    }
    write(path,modelArray)
}

function updateModel(model,data){
    let path = __dirname+`/../db/${model}.json`
    let modelArray = readModel(model)
    if(modelArray){
        if(modelArray.find(obj=>obj.id===data.id)){
            let index = modelArray.findIndex(obj=>obj.id===data.id)
            modelArray.splice(index,1,data)
            write(path,modelArray)
        }else{
            throw new Error(`No record with ${data.id} was found`)
        }
    }else{
        throw new Error('No records found')
    }
}

function deleteModel(model,id){
    let path = __dirname+`/../db/${model}.json`
    let modelArray = readModel(model)
    if(modelArray){
        if(modelArray.find(obj=>obj.id===id)){
            let index = modelArray.findIndex(obj=>obj.id===id)
            modelArray.splice(index,1)
            write(path,modelArray)
        }else{
            throw new Error(`No record with Id ${id} was found`)
        }
    }else{
        throw new Error('No records found')
    }
}

function getModel(model,id){
    let path = __dirname+`/../db/${model}.json`
    let modelArray = readModel(model)
    if(modelArray){
        let modelObj = modelArray.find(obj=>obj.id===id)
        if(modelObj){
            return modelObj
        }else{
            throw new Error(`No record with Id ${id} was found`)
        }
    }else{
        throw new Error('No records found')
    }
}

module.exports={readModel,addModel,updateModel,deleteModel,getModel}