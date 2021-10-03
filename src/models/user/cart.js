const mongoose=require('mongoose')
const user = require('./user')

const userproductschema=new mongoose.Schema({
    carts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'dynamicProduct'
    },{
        type:Number
    }],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'dynamicProduct'
    }],
    purchased:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'dynamicProduct'
    }],
    ordered:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'dynamicProduct'
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports=mongoose.model('Userproduct',userproductschema)