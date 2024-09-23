const express= require("express")


const app= express()
app.get("/",(req,res,next)=>{
    res.send("hello world")
})



const port=5000

app.listen(port,()=>{
    console.log("App start at port 5000")
})