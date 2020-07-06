const mongoose=require('mongoose');
const schema=mongoose.Schema;
// const sha256=require('crypto-js/sha256')

//create schema
const VehicleSchema=new schema({
    model:{
        type:String,
        required:true
    },
    uid:{
        type:String,
        default: Date.now().toString()
    }
})
module.exports=Vehicle=mongoose.model('vehicle',VehicleSchema)