const express=require('express')
const router =express.Router()
 const Userproduct=require('../../models/user/cart')
const auth=require('../../authentication/user/auth')
const Products=require('../../models/products')
const Product=require('../../models/products')

// //  Get Routes for carts,wishlist,purchased,ordered
{/* <div class="coupon">
<input type="text" name="coupon_code" class="form-control" id="coupon_code" value="" placeholder="Coupon code"> 
<button id="submitform" type="submit" class="btn btn-primary" name="apply_coupon" value="Apply coupon">Apply coupon</button>
</div> */}

router.get('/cart',auth,async(req,res)=>{
    try{
        var  productarray=[]
        const user=req.user
        const productid=user.products._id
        const userproduct=await Userproduct.findOne({_id:productid})
        for (var i=0;i<userproduct.carts.length;i++){
            const product=await Product.findOne({_id:userproduct.carts[i]})
            productarray.push(product)  
        }
        //console.log(productarray)
        res.render('cart.ejs',{user:req.user,cart:productarray})
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/address',(req,res)=>{
    res.render('address.ejs')
})

router.get('/removecart/:id',auth,async(req,res)=>{
    try{
        const user=req.user
        const productid=user.products._id
        const id=req.params.id
        const userproduct=await Userproduct.findOne({_id:productid})
        if(userproduct.carts[0]===id){
            console.log('happy')
        }
        userproduct.carts=userproduct.carts.filter((cart)=>{
            return cart.toString()!==id
        })
        await userproduct.save()
        res.redirect('/user/cart')
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/order-history',auth,async(req,res)=>{
    try{
        const products=await Userproduct.findOne({user:req.user._id})
        const products_ids=products.ordered
        var all_ordered_products=[]
        for(var i=0;i<products_ids.length;i++){
            const product=await Products.findById({_id:products_ids[i]})
            all_ordered_products=all_ordered_products.concat(product)
        }
        res.render('order-history.ejs',{user:req.user,products:all_ordered_products})
    }catch(e){
        res.send(e)
    }
})

router.get('/wishlist',auth,async(req,res)=>{
    try{
        console.log(req.user._id)
        var  productarray=[]
        const user=req.user
        const productid=user.products._id
        const userproduct=await Userproduct.findOne({_id:productid})
        console.log('userproduct',userproduct)
        for (var i=0;i<userproduct.wishlist.length;i++){
            const product=await Product.findOne({_id:userproduct.wishlist[i]})
            productarray.push(product)  
        }
        
        res.render('wishlist.ejs',{user:req.user,wishlist:productarray})
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/removewishlist/:id',auth,async(req,res)=>{
    try{
        const user=req.user
        const productid=user.products._id
        const id=req.params.id
        const userproduct=await Userproduct.findOne({_id:productid})
        userproduct.wishlist=userproduct.wishlist.filter((wishlist)=>{
            return wishlist.toString()!==id
        })
        await userproduct.save()
        res.redirect('/user/wishlist')
    }catch(e){
        res.status(500).send(e)
    }
})

// router.get('/purchased',auth,async(req,res)=>{
//     try{
//         const user=req.user
//         const productid=user.products[0]._id
//         const userproduct=Userproduct.findById({productid})
//         res.send(userproduct.purchased)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// router.get('/ordered',auth,async(req,res)=>{
//     try{
//         const user=req.user
//         const productid=user.products[0]._id
//         const userproduct=Userproduct.findById({productid})
//         res.send(userproduct.ordered)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })
// // Routes to post or add products in cart ,wishlist,ordered and purchased  category

router.get('/addcart/:id',auth,async(req,res)=>{
    try{
        const userid=req.user._id
        const userproduct=await Userproduct.findOne({user:userid})
        const product_id=req.params.id     //product_id is the id of the product to be added in cart
        const ismatch=userproduct.carts.filter((cart)=>{
            return cart.toString()===product_id
        })

        
        if(ismatch.length===0){
            userproduct.carts=userproduct.carts.concat({_id:product_id})
            await userproduct.save()
            res.redirect('/user/cart')
        }else{
           // req.flash({'message':"already present in cart"})
            res.redirect(`/product/id/`+product_id)
        }
        
        
        
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/wishlist/:id',auth,async(req,res)=>{
    try{
        const userid=req.user._id
        const userproduct=await Userproduct.findOne({user:userid})
        const product_id=req.params.id     //product_id is the id of the product to be added in cart
        const ismatch=userproduct.wishlist.filter((wishlist)=>{
            return wishlist.toString()===product_id
        })
        
        if(ismatch.length===0){
            userproduct.wishlist=userproduct.wishlist.concat({_id:product_id})
            await userproduct.save()
            res.redirect('/user/wishlist')
        }else{
           // req.flash({'message':"already present in cart"})
            res.redirect(`/product/id/`+product_id)
        }
    }catch(e){
        res.status(500).send(e)
    }
})

// router.post('/purchased',auth,async(req,res)=>{
//     try{
//         const productid=req.body.products
//         const userproduct=Userproduct.findById({productid})
//         const product_id=req.body    //product_id is the id of the product to be added in cart
//         userproduct.purchased=userproduct.purchased.concat({_id:product_id})
//         res.send(userproduct.carts)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

// router.post('/ordered',auth,async(req,res)=>{
//     try{
//         const productid=req.body.products
//         const userproduct=Userproduct.findById({productid})
//         const product_id=req.body    //product_id is the id of the product to be added in cart
//         userproduct.ordered=userproduct.ordered.concat({_id:product_id})
//         res.send(userproduct.carts)
//     }catch(e){
//         res.status(500).send(e)
//     }
// })

module.exports=router