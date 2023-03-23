// import { findOne } from "../../src/model/addproduct"
// const a=document.getElementById("a")
// const submitbtn=document.getElementById("")
let b=document.getElementById("b")
let c=document.getElementById("c")
let searchp=document.getElementById("searchp")
// import "../../src/db/db"

const get_info= async (event)=>{
    // event.preventDefault();
    try {
        // const searchInput = a.value;
        // const searchedInput = await findOne({name: searchInput });
        // const data=await searchedInput.json();
        // // const arrdata=[data]
        document.getElementById("a").innerHTML="apple";

        // console.log(searchInput);



        
    } catch (error) {
        console.log("error");
    }
   

}
get_info();
searchp.addEventListener( 'click'  ,  get_info)

