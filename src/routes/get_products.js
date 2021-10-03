const express=require('express')
const router=express.Router()
const products=require('../models/products')
const category_tags=require('../models/category_tags')
const public_auth=require('../authentication/publicauth/auth')
const tags=require('../models/tags')
var async  = require('express-async-await')
var fetch = require('node-fetch')

router.get('/product-details_auction',public_auth,async(req,res)=>{
    try{
        res.render('product-details_auction.ejs',{user:req.user})
    }catch(e){
        res.send(e)
    }
})


router.get('/product-details',public_auth,async(req,res)=>{
    try{
        res.render('product-details.ejs',{user:req.user})
    }catch(e){
        res.send(e)
    }
})



router.get('/category/:name',async(req,res)=>{
    try{
        //const product=await products.find({'productdetail.category':req.params.name})
       
        const all_products_ids=await tags.find({})
        const product_ids=all_products_ids[0][req.params.name]
        if(product_ids !== 'undefined')
        {
            var all_products=[]
            for(var i=0;i<product_ids.length;i++)
            {
                console.log(product_ids[i])
                if(product_ids[i].product_id)
                {
                    const product=await products.findById({_id:product_ids[i].product_id})
                    all_products=[...all_products,product]
                }                
            }
            // res.json({products:all_products})
            res.render('productlist.ejs',{products:all_products.reverse(),user:req.user})
        }    
        
    }catch(e){
        res.send(e)
    }
})

router.get('/subcategory/:name',async(req,res)=>{
    try{
        //const product=await products.find({'productdetail.category':req.params.name})
       
        const all_products_ids=await tags.find({})
        const product_ids=all_products_ids[0][req.params.name]
        if(product_ids !== 'undefined')
        {
            var all_products=[]
            for(var i=0;i<product_ids.length;i++)
            {
                console.log(product_ids[i])
                if(product_ids[i].product_id)
                {
                    const product=await products.findById({_id:product_ids[i].product_id})
                    all_products=[...all_products,product]
                }                
            }
            // res.json({products:all_products})
            res.render('productlist.ejs',{products:all_products.reverse(),user:req.user})
        }    
        
    }catch(e){
        res.send(e)
    }
})



router.get('/get_tags',async(req,res)=>{
    try{
        const all_tags=await category_tags.find({})
        const tag=req.query.tag
        const tag_lower=tag.toLowerCase()

        res.send(all_tags[0][tag_lower])
    }catch(e){

    }
})


router.get('/alltags',async(req,res)=>{
    try{
        const all_tags=await tags.find({})
        res.json(Object.keys(all_tags[0]._doc))
    }catch(e){
        console.log(e)
    }
})

router.get('/search',public_auth,async(req,res)=>{
    try{
        const all_products_ids=await tags.find({})
        const product_ids=all_products_ids[0][req.query.tag]
        if(product_ids !== 'undefined')
        {
            var all_products=[]
            for(var i=0;i<product_ids.length;i++)
            {
                console.log(product_ids[i])
                if(product_ids[i].product_id)
                {
                    const product=await products.findById({_id:product_ids[i].product_id})
                    all_products=[...all_products,product]
                }                
            }
            // res.json({products:all_products})
            res.render('productlist.ejs',{products:all_products.reverse(),user:req.user})
        }
    }catch(e){
        res.send(e)
    }
})

// router.get('/id/:id',public_auth,async(req,res)=>{
//     try{
//         const product=await products.findById({_id:req.params.id})
//         function getTags(value)
//         {
//             return fetch('http://localhost:3000/product/get_tags?tag='+value);
//         }
//         const tags=async()=>{
//             if(product){
//                 const data=await getTags(product.productdetail.subcategory);
//                 const list=await data.json();
//                 console.log(list);
//                 res.render('product-details.ejs',{taglist:list,product:product.productdetail,user:req.user,product_id:product._id})
//             }           

//         }
//        tags();
//         // res.json(product)
//     }catch(e){
//         res.send(e)
//     }
// })

router.get('/id/:id',public_auth,async(req,res)=>{
    try{
        const product=await products.findById({_id:req.params.id}).populate('comments');
        function getTags(value)
        {
            return fetch('https://global-nostolgia.herokuapp.com/product/get_tags?tag='+value);
            // return fetch('http://localhost:3001/product/get_tags?tag='+value);
        }
        const tags=async()=>{
            if(product){
                const data=await getTags(product.productdetail.subcategory);
                const list=await data.json();
                // console.log(product);
                // console.log(product.comments);
                res.render('product-details.ejs',{comments:product.comments,taglist:list,product:product.productdetail,user:req.user,product_id:product._id})
            }           

        }
       tags();
        // res.json(product)
    }catch(e){
        res.send(e)
    }
});
//featured products
//hot sale
//trending
//best seller

//filter route
router.post('/filters',async(req,res)=>{
    try {
        var ans=[];
        const filter_tags=await tags.find({});
        const all_tags=filter_tags[0];
        console.log(all_tags);
        const filters=req.body.filters;//to be applied tags
        console.log(filters);
        const products_for_first_filter=all_tags[filters[0][0]];
        products_for_first_filter.forEach(async (prod_id)=>{
            var prod=await products.findById({_id:prod_id});
            for(var i=0;i<filters.length;i++)                 // looping through tags (color,size)
            {
                for(var j=0;j<filters[i].length;j++)           // looping through tags value (blue,red,black)
                {
                    if(prod[filters[i]].equals(filters[i][j]))
                    ans.push(prod);
                }
            }
        })
        console.log(ans);
        res.send(ans);
        
    } catch (error) {
        console.log(error);
    }
})



// filter input Format
// [
//   color:[blue,red,black],
//   size:[43,46],
// ]
// router.post('/filters',async(req,res)=>{
//     try {
      
//       const filter=req.body.filters;
//       const tags_list=await Tag.findById('tag_id');//ek common id hogi mere hisab se jismein saare tags ke array ke andr product ids hogi
//       const product_id_array_for_first_filter=tags_list[filter[0]];// this have all products ids which have first filter category
//                                                                   // here it have all product_ids which are in color tags array
//       var answer=[];                                // array containg all products after filtering
//       product_id_array_for_first_filter.forEach(element => {// looping through all products of array
//         var prod=await Product.findById(element);
//         for(var i=0;i<filter.length();i++)                 // looping through tags (color,size)
//         {
//           for(var j=0;j<filter[i].length();j++)           // looping through tags value (blue,red,black)
//           {
//             if(prod[filter[i]]===filter[i][j])
//               answer.push(prod);
//           }
//         }
//       });
//       res.send(answer);
//     } catch (error) {
//       console.log(error);
//     }
//   })

module.exports=router