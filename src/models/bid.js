const mongoose=require('mongoose')

const bidschema=new mongoose.Schema({
    product: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"dynamicProduct"
    },
    date: {type: Number, default: new Date().getTime()},
    price: Number,
    user: {
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    }
});

module.exports=mongoose.model('Bids',bidschema)