const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");

const orderSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default:null
    },
    customerEmail:{
        type:String,
        required:true,
        trim:true
    },
    shippingAddress:addressSchema,
    products:[
        {
            productId:{
                type: mongoose.Schema.ObjectId,
                ref:"Product",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true,
                min:0
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }
        }
    ],
    totalAmount:{
        type:Number,
        required:true,
        min:0
    },
    status:{
        type:String,
        enum:["pending", "shipped", "delivered"],
        default:"pending"
    }
},{ timestamps: true });

module.exports = mongoose.model('Order',orderSchema);