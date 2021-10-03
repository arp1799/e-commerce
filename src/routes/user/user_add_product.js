const express=require('express')
const router=express.Router()
const multer=require('multer')
const auth=require('../../authentication/user/auth')
const products=require('../../models/products')
const dynamicproduct=require('../../models/products')
const tags=require('../../models/tags')
const Bid_data=require('../../models/bid_data.js')

router.get('/myproduct',auth,async(req,res)=>{
    try{
        const myproducts=await dynamicproduct.find({'productdetail.user':req.user._id})

        res.render('myproduct.ejs',{user:req.user,myproducts})
    }catch(e){
        res.send(e)
    }
})


router.get('/addproducts',auth,async(req,res)=>{
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
        fileSize:2000000
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

router.post('/addproduct',auth,upload.array('image'),async(req,res)=>{
    try{
        var avatar=[]
        for(var i=0;i<req.files.length;i++)
        {
            const result=await cloudinary.uploader.upload(req.files[i].path)
            avatar=avatar.concat(result.secure_url)
        }
        console.log(req.body)
        const new_product={
            ...req.body,
            avatar,
            user:req.user._id
        }
        

        //STORING PRODUCT INFO.
        const product=new products({})
        product.productdetail=new_product
        product.markModified('productdetail')
        const id=product._id

        //adding for bid status
        const bid_data=await Bid_data.create({});
        product.bid=bid_data._id;
        if(product.bidded==='yes')
            product.bidded=true;
        //ADDING PRODUCTS IN TAGS
        const filter_tags=await tags.find({})
        const all_tags=filter_tags[0]
        for(const key in req.body)
        {
            if(all_tags[key] !== undefined)
            {
                all_tags[key]=all_tags[key].concat({product_id:id})
            }
            else if(all_tags[req.body[key]] !== undefined)
            {
                all_tags[req.body[key]]=all_tags[req.body[key]].concat({product_id:id})
            }
        }
        await all_tags.save()
        await product.save()
        console.log(product);
        console.log(bid_data);
        res.redirect('/')
    }catch(e){
        console.log(e)
        res.send(e)
    }
})

module.exports=router