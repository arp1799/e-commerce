var mongoose = require("mongoose");

var commentSchema = new  mongoose.Schema({
    comment:String,
    author:String,
    createdAt:{type:Date, default:Date.now},
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    email:String,
    rating: {
        type: Number,
        required: "Please provide a rating (1-5 stars).",
        min: 1,
        max: 5,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value."
        },
    },
    product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "dynamicProduct"
        }
    

});

module.exports=mongoose.model("Comment",commentSchema);