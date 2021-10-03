const jwt=require('jsonwebtoken')
const Vendor=require('../../models/vendor/vendor')
const User=require('../../models/user/user')
const auth=async(req,res,next)=>{
    try{
        const token=req.cookies['auth_token']
        const decode=await jwt.verify(token,'thisismyjwtsecret')
        if(decode.role === 'vendor')
        {
            const vendor=await Vendor.findOne({_id:decode._id,'tokens.token':token})
            req.vendor=vendor
        }
        else
        {
            const user=await User.findOne({_id:decode._id,'tokens.token':token})
            req.user=user
        }
        next()
    }catch(e){
        next()
    }
}

module.exports=auth