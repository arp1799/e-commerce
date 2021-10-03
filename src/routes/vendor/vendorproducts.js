const express=require('express')
const router=express.Router()
const multer=require('multer')
const auth=require('../../authentication/vendor/auth')
const VendorProduct=require('../../models/vendor/vendorproduct')

router.get('/vendor/addproducts',auth,async(req,res)=>{
    res.render('addproducts.ejs')
})


const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        cb(undefined,Date.now()+'-'+file.originalname)
    }
})


const upload=multer({
    storage,
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpeg|jpg|gif)$/)){
            cb(new Error('File must be an image!!'))   
        }
        cb(undefined,true)
    }
})


const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'drybfwveo', 
  api_key: "328354267454673", 
  api_secret:"K_hc0VA-vOtGG6zzGi3aA1ANRy8" 
});

router.post('/vendor/addproduct',auth,upload.single('image'),async(req,res)=>{
    try{
        const result=await cloudinary.uploader.upload(req.file.path)
        const product={
            ...req.body,
            company:req.vendor.companyname,
            avatar:result.secure_url,
            vendor:req.vendor._id
        }
        const vendorproducts=await VendorProduct.findById({_id:req.vendor.products})
        vendorproducts.products.push(product)

        const allproducts=new AllProducts(product)
        
        await allproducts.save()
        await vendorproducts.save()
        res.redirect('/')
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

module.exports=router