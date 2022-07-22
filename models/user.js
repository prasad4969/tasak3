const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const feedSchema=new Schema({
    username:{
        type:String,
        required:true
    },
    // password:{
    //     type:String,
    //     required:true
    // },
  
},{timestamps:true});

const User=mongoose.model('Register',feedSchema);
module.exports=User;