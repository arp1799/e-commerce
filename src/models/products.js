const mongoose=require('mongoose')

const productschema=new mongoose.Schema({

    productdetail:mongoose.Schema.Types.Mixed,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    rating: {
        type: Number,
        default: 0
    },
    date: {type: Number, default: new Date().getTime()},
    start_bid_date: {type: Number, default: new Date().getTime()},
    bidded: {type: Boolean, default: false},
    bid:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"bidding_data"
        
        }
})

module.exports=mongoose.model('dynamicProduct',productschema)