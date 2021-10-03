const express=require('express')
const router= express.Router()


router.post('/send-message',async(req,res)=>{
    try{
        const data=req.body
        console.log(data)
    }catch(e){

    }
})


module.exports=router