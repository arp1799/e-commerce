const express=require('express');
const router =express.Router();
const Address=require('../../models/user/address');
const User=require('../../models/user/user');
const auth=require('../../authentication/user/auth');

router.get("/:id",auth,async(req,res)=>{
    try{
        //console.log('dqjwhqdjhqdjqhwdqwjhdqwhjd')
        // console.log('param',req.params.id)
        const user=await User.findById(req.user._id).populate('addresses');
        res.render("address.ejs",{user:req.user,addresslist:user.addresses,total:req.params.id});
    }
    catch(error)
    {
        console.log(error);
    }
});

//add address
router.post("/:id",auth, async(req,res)=>{
    try{
        const user=req.user;
        console.log(req.body);
         const address=new Address(req.body);
         await address.save();
        user.addresses=user.addresses.concat({_id:address._id}); 
        await user.save();
        res.redirect("/user/address/"+req.params.id);
    }
    catch(err)
    {
        console.log(err);
        res.redirect('/user/address')
    }
});

//update address
router.get("/edit/:aid",auth,async(req,res)=>{
    try {
        const user=req.user;
        const address=await Address.findById(req.params.aid);
        res.render("editaddress.ejs",{address:address,user:user});
    } catch (error) {
        res.send(error);
    }
})
router.put("/:aid",auth,async(req,res)=>{
    //aid is address id passed as param in url
    try{
        const user=req.user;
        const address=req.body;
        const result = await Address.findByIdAndUpdate(req.params.aid,address,{new:true});
        res.redirect("/user/address/");
    }
    catch(err)
    {   console.log(err);
        res.send(err);
    }
});

//delete address 
router.get("/delete/:id/:sum",auth,async(req,res)=>{
    //console.log('iamhere')
    //aid is address id passed as param in urls
    try{
      //  console.log('deletewedw',req.params.id,req.params.sum)
        const user=req.user;
        const result = await Address.findByIdAndRemove(req.params.id);
        // const updatedUser = await User.findByIdAndUpdate(req.user._id, {$pull: {addresses: req.params.aid}}, {new: true})
        
        res.redirect("/user/address/"+req.params.sum);
    }
    catch(err)
    {   console.log(err);
        res.send(err);
    }
})


module.exports = router;