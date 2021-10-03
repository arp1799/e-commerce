const express=require('express')
const router=express.Router()
const Vendor=require('../../models/vendor/vendor')
const vendorproduct=require('../../models/vendor/vendorproduct')
const auth=require('../../authentication/vendor/auth')
const bcryptjs=require('bcryptjs')

  router.get("/signin", (req, res) => {
    res.render("vendor_login-reg.ejs");
  });
  

router.post('/register',async(req,res)=>{
    try{
        const vendor=await Vendor.findOne({email:req.body.email})
        if(vendor)
        {
            res.render('vendor_login-reg.ejs',{
                error:'E-mail id is already registered!',
                no:'2'
            })
        }
        else
        { 
            const vendor=new Vendor(req.body)
            const token=await vendor.generateauthtoken()
    
            const productschema=new vendorproduct({})
            vendor.products=productschema._id.toString()
            await vendor.save()
            await productschema.save()
            res.cookie('auth_token',token)
            res.redirect('/')
        }
    }catch(e){
        res.status(400).send(e)
    }
})



router.get('/profile',auth,async(req,res)=>{
    try{
        res.send(req.vendor)
    }catch(e){
        res.redirect('/')
    }
})

router.post('/signin',async(req,res)=>{
    try{
        const vendor=await Vendor.findOne({email:req.body.email})
        var error=null
        if(!vendor){
            error="Email or password are incorrect!"
            res.render('vendor_login-reg.ejs',{
                error,
                no:'1'
            })
        }else{
            const isMatch=await bcryptjs.compare(req.body.password,vendor.password)
            if(!isMatch){
                error="Email or password are incorrect!"
                res.render('vendor_login-reg.ejs',{
                    error,
                    no:'1'
                })
            }
            if(error === null)
            {
                const token=await vendor.generateauthtoken()
                res.cookie('auth_token',token)
                res.redirect('/')
            }
        }
    }catch(e){
        console.log(e)
        res.status(400).send('Server error')
    }
})

router.get('/logout',auth,async(req,res)=>{
    try{
        req.vendor.tokens=req.vendor.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.vendor.save()
        res.redirect('/')
    }catch(e){
        res.send(e.message)
    }
})

module.exports=router