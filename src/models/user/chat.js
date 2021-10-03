const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    socket_id:{
        type:String,
    },
    messages:[{
        message:{
            text:String,
            time:Date,
            author:Boolean
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }]
})

module.exports=mongoose.model('Chat',schema)