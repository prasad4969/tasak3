const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const feedSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
},{timestamps:true});

const Feed=mongoose.model('Feed',feedSchema);
module.exports=Feed;