const express=require("express")
const app=express()
const mongoose=require("mongoose")
const config=require("./Config/config")
const cors=require("cors")
const path=require("path")



const PORT=process.env.PORT || 5000

// mongoose.connect(config.database,{useNewUrlParser:true})
mongoose.connect(config.mlab,{useNewUrlParser:true,useUnifiedTopology: true})

const con=mongoose.connection
app.use(express.json())
app.use(cors())
con.on('open',()=>{
    console.log("Connected to "+config.mlab)
})


const UserInfo=require('./Routes/userrouter')
// app.use(express.static(path.join(__dirname, '../build')))
app.use('/user',UserInfo)

// app.get('*',(req, res) => {
//     res.sendFile(path.join(__dirname, "../build/index.html"))
   
//   })

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
})