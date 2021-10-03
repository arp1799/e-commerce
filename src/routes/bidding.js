const express=require('express')
const router=express.Router()
const Bid=require('../models/bid.js')
const Product=require('../models/products.js')
const Bid_data=require('../models/bid_data.js')
const auth=require('../authentication/user/auth');
var middlewareObj=require("../../middleware/index.js");


                    
//req.body{price};
router.post('/product/:id/bid',auth,async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id);
        console.log("+");
        // console.log(product);
        // console.log(req.body);
        const bid=await Bid.create(req.body);
        bid.user.id=req.user._id;
        bid.user.username=req.user.firstname+" "+req.user.lastname;
        bid.product=req.params.id;
        bid.save();
        // console.log("+");
        // console.log(bid);
        const bidding_data=await Bid_data.findById(product.bid);
        // console.log("+");
        // console.log(bidding_data);
        bidding_data.history.push(bid._id);
        if((bid.price>bidding_data.highestBid.price)&&(bid.price>product.productdetail.price))
        {
            bidding_data.highestBid.id=bid._id;
            bidding_data.highestBid.price=bid.price;
        }
        bidding_data.save();
        res.send(bidding_data);
    } catch (error) {
        res.send(error);
    }
});

router.get('/product/:id/higeshtbid',async(req,res)=>{
    const product=await Product.findById(req.params.id);
    const bidding_data=await Bid_data.findById(product.bid).populate("history");
    const price=bidding_data.highestBid.price;
    const bid_details=await Bid.findById(bidding_data.highestBid.id);
    console.log(bid_details);
    const history=bidding_data.history;
    res.send(bidding_data);
});

module.exports=router