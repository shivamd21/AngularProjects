const express=require("express")
const app=express()
const mongoose=require("mongoose")
const config=require("./Config/config")
const cors=require("cors")
const path=require("path")

app.use(express.static(path.join(__dirname, '../moviehub/dist/moviehub')))

const PORT=process.env.PORT || 5000

// mongoose.connect(config.database,{useNewUrlParser:true})
mongoose.connect(config.mlab,{useNewUrlParser:true})

const con=mongoose.connection
app.use(express.json())
app.use(cors())
con.on('open',()=>{
    console.log("Connected to "+config.mlab)
})

app.get('/*',(req, res) => {
    // res.sendFile(path.join(__dirname, "../moviehub/dist/moviehub", "index.html"))
    const index = path.join(__dirname, '../moviehub/dist/moviehub', 'index.html');
    // console.log(index)
    res.sendFile(index)
  })

const UserInfo=require('./Routes/userrouter')
app.use('/user',UserInfo)

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`)
})