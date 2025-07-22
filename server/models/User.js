const mongoose = require("mongoose");
const addressSchema = require("./addressSchema");
const bcryptjs = require("bcryptjs");
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:[
            "admin",
            "user"
        ],
        default:"user"
    },
    savedAddresses:[addressSchema],
    cart:[
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref:'Product',
                required:true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ]
}, { timestamps: true });

userSchema.pre('save',async function (next) {

    if(!this.isModified('password')){
        return next();
    }

    try{
        const hashedPassword = await bcryptjs.hash(this.password,10);
        this.password = hashedPassword;
        next();
    } catch(err){
        next(err);
    }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword,this.password);
}

module.exports = mongoose.model('User',userSchema);