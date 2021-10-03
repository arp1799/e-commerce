const express=require('express');
const router =express.Router();
const Address=require('../../models/user/address');
const User=require('../../models/user/user');
const auth=require('../../authentication/user/auth');

router.get("/delivery/:aid",auth,async(req,res)=>{
    //take cart here and pass it in along
    // take aid ->address id
    try {
        
         const user=req.user;
        // const productid=user.products[0]._id;
        // const userproduct=await Userproduct.findById({productid});
        // const cart=userproduct.carts
        const address=await Address.findById(req.params.aid);
        // res.render("deliveryoption.ejs",{address:address},{cart:cart});
        res.render("deliveryoption.ejs",{address:address});
    } catch (error) {
        console.log(error);
       res.send(error);
    }
});

router.get("/review/:aid",auth,async(req,res)=>{
    //take cart here and pass it in along
    try {
        const address=await Address.findById(req.params.aid);
        res.render("revieworder.ejs",{address:address});
    } catch (error) {
        console.log(error);
        res.redirect(back);
    }
});


module.exports = router;