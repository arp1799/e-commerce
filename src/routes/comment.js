const express=require('express')
const router=express.Router()
const Products=require('../models/products')
const Comment=require('../models/comment')
const auth=require('../authentication/user/auth');
var middlewareObj=require("../../middleware/index.js");


                    

router.post('/:id/comment',auth,middlewareObj.checkAuthorization,middlewareObj.validateComment,async(req,res)=>{
    try {
        const product=await Products.findById(req.params.id).populate('comments');
        const comment=await Comment.create(req.body);
        comment.author.id=req.user._id;
        comment.author.username=req.user.firstname+req.user.lastname;
        comment.product=req.params.id;
        comment.save();
        product.comments.push(comment);
        product.rating=calculateAverage(product.comments);
        product.save();
        res.redirect('/product/id/'+req.params.id);
    } catch (error) {
        res.send(error);
    }
})


function calculateAverage(reviews) {
    if (reviews.length === 0) {
        return 0;
    }
    var sum = 0;
    reviews.forEach(function (element) {
        sum += element.rating;
    });
    return sum / reviews.length;
}

module.exports=router