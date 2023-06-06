const express = require('express')
const app = express()
const PORT =5000;

const mongoose = require('mongoose')
const {MONGOURI} =require('./key')


require('./models/user')
require('./models/post')

app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))


mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true 
}) 


mongoose.connection.on("connected",()=>{
    console.log('connected to mongodb')
})

mongoose.connection.on("error",(err)=>{
    console.log('error connecting',err)
})

// const constomMiddleware = (req,res,next)=>{
//     console.log('constom middleware')
//     next()
// }

// app.use(constomMiddleware)


// app.get('/',(req,res,)=>{
//     console.log('home')
//     res.send("hello world")
   
// })

// app.get('/about',constomMiddleware,(req,res,)=>{
//     console.log('about')
//     res.send("about page ")
   
// })


app.listen(PORT,()=>{
    console.log("server is running on ",PORT)
})

// shubhangipendam18
// S2pfIIYU2rmU8YM1

// mongodb+srv://shubhangipendam18:<password>@cluster1.eu56h7r.mongodb.net/?retryWrites=true&w=majority