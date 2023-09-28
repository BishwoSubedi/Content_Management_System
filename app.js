const express=require('express');
const { blogs } = require('./model/index');
const app =express ();
const port=process.env.PORT||3000;


//DataBase Connection
require("./model/index")

//telling the ejs to set the view engine to ejs
app.set('view engine','ejs');
 

//parsing the form data
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//getting data
 app.get("/", async(req,res)=>{
   const blog=await blogs.findAll();
    res.render("home",{data:blog})
 })
//getting single blog
app.get("/single/:id",async(req,res)=>{
   const id =req.params.id;
const blog=  await blogs.findAll({
   where :{
      id:id
   }
    })
   //  console.log(single)
   res.render("singleBlog",{data:blog})
})



 //create blog
 app.get("/create",(req,res)=>{
    res.render("create")
 })

 //post blog
 app.post("/create", async(req,res)=>{
   //  console.log(req.body)
   const{title,subtitle,description}=req.body;

   //inserting into database
  await  blogs.create({
      title:title,
      subtitle:subtitle,
      description:description,
   })
   //  res.send("Form Submitted Successfully")
   res.redirect("/")
 })
 

 //Edit Blog
 app.get("/edit/:id",async(req,res)=>{
   const id= req.params.id;
  const data= await blogs.findAll({where:{id:id}})
   
   res.render("editBlog",{blog:data})
 })
  
 app.post("/edit/:id",async(req,res)=>{
   const id =req.params.id;
   const{title,subtitle,description}=req.body;

    await blogs.update({
      title:title,
      subtitle:subtitle,
      description:description
   },{
      where:{
         id:id
      }
   })
   res.redirect("/single/" + id)
 })

















 //deleting the blog
app.get("/delete/:id",async(req,res)=>{
   const id= req.params.id;
   await blogs.destroy({
      where:{
         id:id
      }
   })
  res.redirect("/")
})


app.listen(port,()=>{
    console.log(`Server is listening at port: ${port}`)
})