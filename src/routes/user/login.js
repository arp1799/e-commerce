const express = require("express");
const router = express.Router();
const User = require("../../models/user/user.js");
const auth = require("../../authentication/user/auth");
const bcryptjs = require("bcryptjs");
const {mailverification,resetpassword} = require("../../emails/mailverification");
const jwt = require("jsonwebtoken");
const Userproduct = require("../../models/user/cart");
const chat=require('../../models/user/chat')

//=========================================
//
//				GET ROUTES     (RENDERING THE PAGES)
//
//==========================================


// router.get("/vender-register",(req,res)=>{
// 	res.render("venderregistration.ejs")
// })

router.get("/signin", (req, res) => {
  res.render("login-reg.ejs");
});

router.get("/forget-password", (req, res) => {
  res.render("forgetpassword.ejs");
});

router.get("/reset-password", (req, res) => {
  const token = req.query.token;
  res.render("resetpassword.ejs", { token });
});

//<-------------->TO READ THE USER PROFILE<---------------->
router.get("/profile", auth, async (req, res) => {
  res.send(req.user);
});

//<------------>TO LOGOUT THE USER<---------------->
router.get("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return req.token !== token.token;
    });
    await req.user.save();
    res.redirect("/");
  } catch (e) {
    res.redirect("/");
  }
});

//<-------------> TO VERIFIED THE EMAIL ID<------------------->
router.get("/mailverification", async (req, res) => {
  try {
    const token = req.query.token;
    const decode = jwt.verify(token, "thisismyjwtsecret");

    var message = null,
      error = null;
    if (decode.type !== "mailverification") error = "Wrong token";

    const user = await User.findById({ _id: decode._id });
    if (!user) error = "Invalid user";

    if (error === null) {
      user.mailverified = true;
      await user.save();
      message = "Mail verified";
    }
    res.render("message-mailverified.ejs", { message, error });
  } catch (e) {
    res.render("message-mailverified.ejs", {
      message: null,
      error: "Server error",
    });
  }
});

//======================================
//
//				POST ROUTES   (CHANGES WITH DATABASE AND AUTHORIZATION)
//
//======================================

router.post("/register", async (req, res) => {
  try {
    const user=await User.findOne({email:req.body.email})
    if(user)
    {
      res.render("login-reg.ejs", {
        msg: 'E-mail id is already registered!',
        no:'2'
      });
    }
    else{
      const user = new User(req.body);//creating user
      const token = await user.generatingauthtoken();
      res.cookie("auth_token", token);

      const userproduct = new Userproduct({});//creating cart schema for user
      userproduct.user=user._id
      await userproduct.save();

      const new_chat=new chat({user:user._id})//creating chat schema for user
      await new_chat.save()

      user.products = userproduct._id;//storing cart id in user schema
      await user.save();
      mailverification(user.email, user._id);
      res.redirect('/')
      // res.render("message-registeredsuccessfully.ejs", {
      //   message: "Registered Sucessfully!",
      //   error: null,
      // });
    }
  } catch (e) {
    res.render("message-registeredsuccessfully.ejs", {
      message: null,
      error: "Server Error",
    });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    var error=null
    if (!user) {
      error="Email or password are incorrect!"
    }
    if(error === null)
    {
        const isMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!isMatch) {
          error="Email or password are incorrect!"
        }
    }

    if(error === null)
    {
      const token = await user.generatingauthtoken();
      res.cookie("auth_token", token);
      res.redirect("/");
    }
    else
    {
      res.render('login-reg.ejs',{
        error,
        no:'1'
      })
    }
	  
  } catch (e) {
    res.redirect("/");
  }
});

router.post("/forget-password", async (req, res) => {
  try {
    var message = null,
      error = null;
    const user = await User.findOne({ email: req.body.email });
    if (user === null) error = "Email is not registered!";

    if (error === null) {
      resetpassword(req.body.email);
      message = "Check you emailid and reset your password.";
    }
    res.render("message-reset.ejs", { message, error });
  } catch (e) {
    res.render("message-reset.ejs", { message: null, error: "Server error" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const token = req.query.token;
    const decode = jwt.verify(token, "thisismyjwtsecret");

    var message = null,
      error = null;
    if (decode.type !== "resetpassword") error = "Wrong token!!";

    if (error === null) {
      const user = await User.findOne({ email: decode.emailid });
      const password = req.body.password;
      user.password = password;
      await user.save();
      message = "Password changed sucessfully";
    }
    res.render("message-passwordchange.ejs", { message, error });
  } catch (e) {
    res.render("message-passwordchange.ejs", {
      message: null,
      error: "Server error",
    });
  }
});

module.exports = router;
