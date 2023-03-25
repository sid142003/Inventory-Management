// import { findOne } from "../../src/model/addproduct"
const Data = require("../src/model/model");
const a=document.getElementById("a")
const submitbtn=document.getElementById("submit")
let b=document.getElementById("b")
let abc=document.getElementById("abc")
let c=document.getElementById("c")
let searchp=document.getElementById("searchsomething")
// import "../../src/db/db"

const getinfo = async (event)=>{
    event.preventDefault();
    abc.innerText="apple" ;
    // alert("ji")
    // let userName=searchp.value;
// const


        // cardempty.innerText="please Enter The City Name";
        
    
    //     try {
    //         let url=`http://localhost:3000/userData`
    //         const  response = await fetch(url)
    //         // const data=await response.json();
    //         const arrdata=[response]
    //         abc.innerText="apple" ;
    
    // b.innerText=arrdata[0].email ;
    // // condition.innerText=arrdata[0].weather[0].main ;
    // // console.log(data );
    //     } catch (error) {
    //     console.log("please Enter The Valid Things");
    //     }
       
    
    
}
getinfo();
submitbtn.addEventListener('click' , getinfo)

