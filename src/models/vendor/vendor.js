const mongoose = require('mongoose');
// const mongoCurrency = require('mongoose-currency');
const validator=require('validator')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')

const vendorSchema = new mongoose.Schema({
    firstname: {
      type: String,
      required: true,
      trim:true
    },
    lastname: {
      type: String,
      required: true,
      trim:true
    },
    password: {
      type: String,
      required: true,
      trim:true,
      validate(value){
          if(value.length<6){
              throw new Error()
          }
      }
    },
    email: {
      type: String,
      required: true,
      unique:true,
      validate(value){
        if(!validator.isEmail(value)){
            throw new Error('Invalid email')
        }
      }
    },
    phoneno: {
      type: String,
      required: true,
      validate(number){
          if(!(number.length === 10)){
              throw new Error()
          }
      }
    },
    companyname: {
      type: String,
      required: true,
      trim:true
    },
    products: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'vendorproduct'
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
  },
  {
    timestamps: true,
  }
);


vendorSchema.methods.generateauthtoken=async function(){
    const vendor=this
    const token=jwt.sign({_id:vendor._id.toString(),role:"vendor"},'thisismyjwtsecret')
    vendor.tokens=vendor.tokens.concat({token})
    await vendor.save()
    return token
}


vendorSchema.pre('save',async function(next){
  try{
    const vendor=this
    if(vendor.isModified('password')){
      vendor.password=await bcrypt.hash(vendor.password,8)
    }
    next()
  }catch(e){
    console.log(e)
  }
})

const vendor = mongoose.model('Vendor', vendorSchema);
module.exports = vendor;