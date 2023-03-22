const addproduct=require("../src/model/addproduct")
const a=document.getElementById("a")
let b=document.getElementById("b")
let c=document.getElementById("c")
let searchp=document.getElementById("searchp")

const get_info= async (event)=>{
    event.preventDefault();
    try {
        // const searchInput = ;
        const searchedInput = await addproduct.findOne({name: searchInput })
        // console.log(searchInput);
a.innerHTML="apple";
        
    } catch (error) {
        console.log("error");
    }
   

}
get_info();

