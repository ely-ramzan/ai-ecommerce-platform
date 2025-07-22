const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    catagory:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    imgURLs:[{
        type :String,
        required:true
    }]
},{ timestamps: true })
module.exports = mongoose.model('Product',productSchema);