
var Comment     = require("../src/models/comment.js");
var Products       = require("../src/models/products.js");

var middlewareObj={};
middlewareObj.checkAuthorization =async(req,res,next)=>{
    try {
        const product=await Products.findById(req.params.id);
        
        if(!((product.productdetail.user).equals(req.user._id)||req.user.isAdmin))
                    next();
        else
        {
            console.log("You don,t have permission to do that");
            res.redirect("back"); 
        }    
        
    } catch (error) {
        console.log(error);
        res.redirect("/product/id/" +req.params.id );
    }
}
middlewareObj.validateComment = async (req,res,next)=>{
    try {
        const product=await Products.findById(req.params.id).populate('comments');
        var foundUserReview = product.comments.some(function (comment) {
            return comment.author.id.equals(req.user._id);
        });
        if (foundUserReview) {
            console.log("You have already wroted an review");
            return res.redirect("/product/id/" +req.params.id );
        }
        // if the review was not found, go to the next middleware
        next();
    } catch (error) {
        console.log(error);
        res.redirect("/product/id/" +req.params.id );
    }

}

// middlewareObj.checkCommentExistence = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         Hotel.findById(req.params.id).populate("comments").exec(function (err,hotel) {
//             if (err || !hotel) {
//                 req.flash("error", "Campground not found.");
//                 res.redirect("back");
//             } else {
//                 // check if req.user._id exists in foundCampground.reviews
//                 var foundUserReview = hotel.comments.some(function (comment) {
//                     return comment.author.id.equals(req.user._id);
//                 });
//                 if (foundUserReview) {
//                     req.flash("error", "You already wrote a review.");
//                     return res.redirect("/hotels/" + hotel._id);
//                 }
//                 // if the review was not found, go to the next middleware
//                 next();
//             }
//         });
//     } else {
//         req.flash("error", "You need to login first.");
//         res.redirect("back");
//     }
// };

// middlewareObj.isLoggedIn=function(req,res,next){
//         if(req.isAuthenticated()){
//             return next();
//         }
//         req.flash("error","You need to be logged to do that");
//         res.redirect("/login");
// }

module.exports=middlewareObj;