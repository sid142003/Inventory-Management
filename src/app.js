const express = require("express");



const jwt=require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const cookie_parser=require('cookie-parser')
let alert = require('alert')

const app = express()
const port = 3000
const path = require("path");
const hbs = require("hbs");
const Data = require("./model/model");
const addproduct=require("./model/addproduct")
// const editproduct=require("./model/")













const template_path = path.join(__dirname, "../template/views");
app.set('view engine', 'hbs')
app.set("views", template_path)
require('./db/db')


app.use(express.urlencoded({ extended: false }));

app.use(express.static('../public'));
// app.use(helmet());
app.use(cookie_parser()); 


app.get("/",    async (req, res) => {
   const Sname = await req.cookies.Sname;
// //    console.log(Sname);
if ( Sname ) {
 res.render("mainpage2",{Sname})
} else {
    console.log(req.cookies);
    res.render("mainpage" )
}

app.get('/mainpage',(req, res)=>{
    res.render("mainpage")
})

    
})
app.post("/entry", async (req, res) => {
    try {

    const Sname=req.body.name
        const password = req.body.password;
        const conf_password = req.body.conf_password;
        if (password === conf_password) {
            const empData = new Data({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
              
                conf_password: req.body.conf_password

            });
            res.cookie("Sname", Sname ,{
                maxAge: 5000,
                // expires works the same as the maxAge
                expires: new Date('01 12 2021'),
                secure: true,
                httpOnly: true,
                sameSite: 'lax'
            })
             
           

 
            const postData = await empData.save();

            alert(" Registered Successfully")
            res.render("mainpage2"  , {Sname});

        }
        else {
            res.send("password  not matching")
        }




    } catch (error) {
        res.send(error);
    }
})

app.post("/login", async (req, res) => {
    try {
        const emailnew = req.body.emailnew;
        
        const password = req.body.passwordnew;
        const useremail = await Data.findOne({ email: emailnew })
    const  ismatch = await  bcrypt.compare(password, useremail.password)
    // console.log(emailnew);
    // console.log(password);
    // console.log(useremail);
    // console.log(ismatch);
        const Sname = useremail.name    
        console.log(Sname);
        res.cookie("Sname",Sname)

        if (ismatch) {
            res.render("mainpage2" , {Sname} )
        } else {
            res.send("Password Not Matching")
        }

    } catch (error) {
        res.sendStatus(400)

    }
})
app.get("/loginPage", (req, res) => {
    res.render("loginPage")
})
app.get("/SignupPage", (req, res) => {
    res.render("SignupPage")
})
app.get("/addproduct", (req, res) => {
    res.render("addproduct")
})
app.get("/editproduct", (req, res) => {
    res.render("editproduct")
})
app.get("/deleteproduct", (req, res) => {
    res.render("deleteproduct")
})
app.get("/deleteproduct", (req, res) => {
    res.render("deleteproduct")
})
app.get("/viewallproducts", (req, res) => {
    res.render("viewallproducts")
})
app.get("/gettotalproducts", (req, res) => {
    res.render("gettotalproducts")
})
app.get("/mainpage", (req, res) => {
    res.clearCookie("Sname" , "email")
    res.render("mainpage")
})
// ADDPRODUCT
app.post("/addproduct", async (req, res) => {
    const Cname = await req.cookies.Sname;
    
    try {

       
            const adddata = new addproduct({
                name: req.body.name,
               price:req.body.price,
               available:req.body.available

            
            });

            const postData = await adddata.save();

            alert(" Data Added Successfully")
            res.render("mainpage2" ,{Cname} )
    } catch (error) {
        res.send(error);
    }
})

app.post("/info", async (req, res) => {

    try {
        const searchInput = req.body.searchInput;
        const searchedInput = await addproduct.findOne({name: searchInput });
    //   const data=JSON.parse(searchedInput)
        var data= {
            Name:searchedInput.name,
            available:searchedInput.available,
            price:searchedInput.price
        }
            
        // console.log(searchInput);
// res.send(Name)
        res.send(data)


        
        console.log(searchInput);

        
    } catch (error) {
        res.sendStatus(400)
    }
   
    
    // res.send("searchedInput")
    // console.log(emailnew);
    // console.log(password);
    // console.log(useremail);
    // console.log(ismatch);
    //     if (ismatch) {
    //         res.render("mainpage2")
    //     } else {
    //         res.send("Password Not Matching")
    //     }

   
})


app.post("/editproduct",  async (req,res)=>{
    const Cname = await req.cookies.Sname;
    const Sname=req.body.name;
    const available=req.body.available;
    const price=req.body.price;

    const searchdata=await  addproduct.findOneAndUpdate({name:Sname} , {$set:{name:Sname , available:available , price:price}})
    
    alert("Data Updated")
    res.render("mainpage2" ,{Cname} )
    
})

app.post("/viewallproducts",  async (req,res)=>{

    const Sname=req.body.searchInput;


    res.render('viewallproducts',{Sname})
    
})
app.post("/deleteproduct",  async (req,res)=>{

    const Sname=req.body.name;
    const Cname = await req.cookies.Sname;

    const searchdata=await  addproduct.findOneAndDelete({name:Sname} )
    res.render("mainpage2" ,{Cname} )
    
    alert("Data Deleted")
    
})


app.get("/ProductData" , async (req,res)=>{
const UserData=await addproduct.find()
res.send(UserData)
})



app.listen(port, function() {
 
    console.log("Example app listening at " + port)
 })