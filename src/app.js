const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Products=require('./models/products')
const dynamicproduct=require('./models/products')
const Tags=require('./models/tags')
const Categorytags=require('./models/category_tags')
const methodOverride = require('method-override');
const socketio=require('socket.io')

//FOR POSTMAN
app.use(express.json());

//  <----------->   ROUTES   <-------------->
const deliveryroutes=require("./routes/user/delivery.js");
const biddingroutes=require("./routes/bidding.js");
const commentroutes=require("./routes/comment.js");
const useraddressroutes = require("./routes/user/address.js");
const userloginRoutes = require("./routes/user/login.js");
const cart = require("./routes/user/cart");
const user_add_product=require('./routes/user/user_add_product')
const vendorroutes = require("./routes/vendor/login");
const vendorproducts = require("./routes/vendor/vendorproducts");
const otherRoutes = require("./routes/user/otherRoutes");
const products=require('./routes/get_products')
const paymentRoute = require("./routes/payment");
const chatroute=require('./routes/user/chat')

// <------------>  DATABASE   <-------------->
require("./db/mongoose");

//<-------------> USING METHOD OVVERIDE <------------------>
app.use(methodOverride('_method'));
//<------------->  GETTING DATA FROM POST REQUEST  <---------------->
app.use(bodyParser.urlencoded({ extended: true }));

//<------------->  SETTING COOKIES TO THE BROWSER  <----------------->
app.use(cookieParser());

//<------------->  SPECIFY THE PATH OF STATIC FILES(eg. css,javascript)  <-------------------->
app.use(express.static("public"));


const auth=require('./authentication/publicauth/auth')
app.get("/",auth, (req, res) => {
  res.render("banner.ejs",{
    user:req.user,
  });
});


app.get('/index',auth,async(req,res)=>{
  var all_products=await dynamicproduct.find({})
  all_products=all_products.reverse()
  const filter_tags=await Categorytags.find({});
  const all_tags=filter_tags[0];
  const featured=await Products.aggregate([{ $sample: { size: 10 } }]);
  // const hotSale=await Products.aggregate([{ $sample: { size: 10 } }]);
  // const trend=await Products.aggregate([{ $sample: { size: 10 } }]);
  // const bestSellers=await Products.aggregate([{ $sample: { size: 10 } }]); 
  // console.log(featured)
  res.render("index.ejs",{
    user:req.user,
    recently_added:all_products,
    featured:featured,
    hotsale:featured,
    bestsell:featured,
    trend:featured,
    tags:all_tags
  });
})

const fun=async()=>{
  const User=require('./models/user/user')
  const users=await User.find({})
  const chat=require('./models/user/chat')
  users.forEach(async(user)=> {
    // console.log(user)
    const message=new chat({user:user._id})
    await message.save()
    console.log(message)
  });
}
// fun()

app.use("/cart", biddingroutes);
app.use("/cart", deliveryroutes);
app.use("/product", commentroutes);
app.use("/user/address", useraddressroutes);
app.use("/user", userloginRoutes);
app.use("/user", user_add_product);
app.use("/user", cart);
app.use("/vendor", vendorroutes);
app.use("/other", otherRoutes);
app.use("/product",products)
app.use(vendorproducts);
app.use("/cart",paymentRoute);
app.use(chatroute)
const PORT = process.env.PORT || 3000;


const http=require('http')
const server=http.createServer(app)
const io=socketio(server)
const chat=require('./models/user/chat')
const jwt=require('jsonwebtoken')

io.on('connection',(socket)=>{
  //when the user joins for the first time...
    //we store the socket id in the database
  socket.on('join',async(from)=>{
    const token=from.replace('auth_token=','')
    const user=jwt.decode(token,'thisismysecret')
    const user_chat=await chat.findOne({user:user._id})
    user_chat.socket_id=socket.id
    const user_chats=await user_chat.save();//saving socket_id

    
    if(user._id.toString() === '5fb1007eb518641c68b5d0db'){//For Admin
      socket.emit('all_admin_messages',user_chat.messages)
    }else{//For all other users
        const all_admin_messages=user_chats.messages.filter((message)=>{
        return message.user.toString() === '5fb1007eb518641c68b5d0db'
      })
      socket.emit('all_admin_messages',all_admin_messages)
    }
    
  })

  socket.on('query_message',async(from,message,to)=>{
    const token=from.replace('auth_token=','')
    const user=jwt.decode(token,'thisismysecret')//getting user_id
    const sender_chat=await chat.findOne({user:user._id})//getting chats of user

    var complete_message={
      message,
      user:to
    }
    sender_chat.messages=sender_chat.messages.concat(complete_message)//chat store to the sender database
    
    
    const recevier_chat=await chat.findOne({user:to})
    complete_message.message.author=false
    complete_message.user=user._id
    recevier_chat.messages=recevier_chat.messages.concat(complete_message)//chat store to the recevier database

    // await sender_chat.save()
    // await recevier_chat.save()
    socket.broadcast.to(recevier_chat.socket_id).emit('message',message)
  })
  
})


server.listen(PORT, function () {
  console.log(`Server has started at ${PORT}`);
});
//chenges