const mongoose=require("mongoose")
const bcrypt=require('bcryptjs')
const schema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        
    },
    password:{
        type:String ,
        required:true
    },
    conf_password:{
        type:String ,
        required:true
    }

})
schema.pre("save" , async function (next) {
    if (this.isModified("password")) {
        // const passwordHash=await bcrypt.hash(password , 10);
    this.password= await bcrypt.hash(this.password , 10)
    this.conf_password= await bcrypt.hash(this.conf_password , 10)
}
next();
    
})
const details = new mongoose.model("details" , schema)
module.exports=details;
