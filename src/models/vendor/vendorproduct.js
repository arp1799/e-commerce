const mongoose=require('mongoose')
const productSchema = new mongoose.Schema({
      products:[{
        productname: {
          type: String,
          trim:true
        },
        price: {
          type: Number,
          trime:true
        },
        avatar:{
          type:String
        },
        description: {
          type: String,
          trim:true
        },
        category: {
          type: String,
          trim:true
        },
        subcategory:{
            type:String,
            trim:true
        },
        company:{
          type:String,
          trim:true
        }
      }]
  });
  

  module.exports=mongoose.model('VendorProduct',productSchema)