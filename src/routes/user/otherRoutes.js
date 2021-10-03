const express = require("express");
const router = express.Router();
const User = require("../../models/user/user.js");
const auth = require("../../authentication/publicauth/auth");

// =======new routes===========//
router.get("/logedin", (req, res) => {
  res.render("logindex.ejs");
});

router.get("/switchaccount", (req, res) => {
  res.render("switchAccount.ejs");
});
router.get("/orders", (req, res) => {
  res.render("orders.ejs");
});
router.get("/buyagain", (req, res) => {
  res.render("buyagain.ejs");
});
router.get("/openOrders", (req, res) => {
  res.render("openOrders.ejs");
});
router.get("/cancelled", (req, res) => {
  res.render("cancelled.ejs");
});

// ========routes for vendor=========  //
router.get("/vendorsignin", (req, res) => {
  res.render("cancelled.ejs");
});
router.get("/vendor_register", (req, res) => {
  res.render("venderregistration.ejs");
});

//==new vendor routes====//

//used at layer_one_vendor at line 72
router.get("/addProducts",auth, (req, res) => {
  res.render("addproducts.ejs",{user:req.user});
});


router.get('/checkout',auth,async(req,res)=>{
  res.render('checkout.ejs',{user:req.user});
})


router.get('/product-category',auth,async(req,res)=>{
  res.render('product-category.ejs',{user:req.user});
})

router.get('/Data_Protection_Policy',auth,async(req,res)=>{
  res.render('Data_Protection_Policy.ejs',{user:req.user});
})

router.get('/privacy_policy',auth,async(req,res)=>{
  res.render('privacy_policy.ejs',{user:req.user});
})

router.get('/terms-and-condition',auth,async(req,res)=>{
  res.render('terms-and-condition.ejs',{user:req.user});
})

router.get('/faq',auth,async(req,res)=>{
  res.render('faq.ejs',{user:req.user})
})

router.get('/marketplace',auth,async(req,res)=>{
  res.render('marketplace.ejs')
})


module.exports = router;