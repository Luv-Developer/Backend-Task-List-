const express = require("express")
const app = express()
const PORT = 3000
const path = require("path")
const fs = require("fs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))

//Routes 
app.get("/",(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{files:files})
    })
})
app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.detail,(err)=>{
        res.redirect("/")
    })
})
app.get("/file/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8",(err,data)=>{
        res.render("show",{filename:req.params.filename,filedata:data})
    })
})
app.get("/edit/:filename",(req,res)=>{
    res.render("edit",{filename:req.params.filename})
})
app.post("/edit",(req,res)=>{
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,(err)=>{
        res.redirect("/")
    })
})
app.listen(PORT,()=>{
    console.log(`App is listening at ${PORT}`)
})