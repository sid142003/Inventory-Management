const express = require("express");
const bcrypt=require('bcryptjs')
 let alert=require('alert')
//  var popups=require("pop")
const app=express()
const port=3050
const path = require("path");
const hbs=require("hbs");
const Data=require("./model/model"); 
const { setTimeout } = require("timers/promises");
const template_path=path.join(__dirname , "../template/views");
app.set('view engine' , 'hbs')
app.set("views" ,template_path )
require('./db/db')



app.use(express.urlencoded({extended:false}));

// const securepassword=async (password)=>{
//     const passwordHash=await bcrypt.hash(password , 2);
//     return passwordHash;
// }
app.get("/" , (req , res)=>{
    res.render("index")
})
app.post("/entry" , async (req , res)=>{
    try {
        
        const password=req.body.password;
        const conf_password=req.body.conf_password;
        if(password===conf_password){
            const empData= new Data ({
                name : req.body.name,
                  email:req.body.email,
                  password:req.body.password,
                  conf_password:req.body.conf_password
  
              });
             
              const postData = await empData.save();
          
             alert(" Form submitted successfully")
              res.render("mainpage");
           
        }
      else{
    res.send("password  not matching")
      }
    
            
    
      
    } catch (error) {
        res.send(error);
    }
})

app.listen(port , ()=>{
    console.log(`server is running on ${port} `);
})