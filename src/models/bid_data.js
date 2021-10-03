const mongoose=require('mongoose')

const bidschema=new mongoose.Schema({
    history:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Bids"
        },
    ],
    highestBid:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Bids"
        },
        price:{
            type: Number,
            default: 0,
        }
    },
    
});

module.exports=mongoose.model('bidding_data',bidschema)