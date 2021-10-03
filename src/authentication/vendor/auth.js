const jwt=require('jsonwebtoken')
const Vendor=require('../../models/vendor/vendor')

const auth=async(req,res,next)=>{
    try{
        const token=req.cookies['auth_token']
        const decode=jwt.verify(token,'thisismyjwtsecret')

        if(decode.role !== 'vendor'){
            res.redirect('/')
        }
        const vendor=await Vendor.findOne({_id:decode._id,'tokens.token':token})
        if(!vendor){
            throw Error()
        }
        req.vendor=vendor
        req.token=token
        next()
    }catch(e){
        res.redirect('/vendor/signin')
    }
}

module.exports=auth