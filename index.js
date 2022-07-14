const express = require('express')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use((req,res,next)=>{
    console.log({
        path:req.path,
        method:req.method,
    })
    next()
})
app.use('/entities',require('./routes/trainerRoute'))
app.use('/entities',require('./routes/traineeRoute'))
app.use('/entities',require('./routes/staffRoute'))

app.listen(process.env.PORT,()=>{
    console.log(`PORT ${process.env.PORT}: Server Runnin...`)
})