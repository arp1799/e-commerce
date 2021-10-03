var express = require("express");
var router = express.Router();
const paypal=require('paypal-rest-sdk')
const Userproduct=require('../models/user/cart')
const auth=require('../authentication/user/auth')

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AWz7-7o-RfEY0_-0vuaErApoFbKF_yFQxMzF0e3Nlk-41nDOJ5J1JI0Xs3gGs4xH16nkSmjU007Z0IKz',
    'client_secret': 'EJp77mQE0XhKvBXN-LFTYyxQaeFvsWjB8Q6trOWjMgU8C8JGuEMkz7t7deM7y9P41vJwp9ztuXmyJv4j'
  });



router.get('/payment/:aid',(req,res)=>{
    //retrive user cards and pass it along
    //take aid ->address id and pass it along
    res.render("payment.ejs",{aid:req.params.aid});
})

router.post('/payment/:total',auth,async (req,res)=>{
    
    console.log(req.params.total)
    
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/cart/success/"+req.params.total,
            "cancel_url": "http://localhost:3000/fail" 
        },
        "transactions": [{
            "item_list": {
            //     "items": [{
            //         "name": "apple phone",
            //         "sku": "001",
            //         "price": "20.00",
            //         "currency": "USD",
            //         "quantity": 1
            //     }]
            },// },
            "amount": {
                "currency": "USD",
                "total": req.params.total     //total
            },
            "description": "This is the payment description of apple phone."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            
            console.log("Create Payment Response");
            //console.log(payment);
            for(var i=0;i<payment.links.length;i++)
            {
                if(payment.links[i].rel === 'approval_url')
                {
                    console.log(payment.links[i].href)
                    res.redirect(payment.links[i].href)
                }
            }
        }
    });


})


router.get('/success/:total',auth, async(req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    console.log('success',req.params.total)
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": req.params.total
          }
      }]
    };
  
    paypal.payment.execute(paymentId, execute_payment_json,  async function (error, payment) {
      if (error) {
          console.log(error.response);
          throw error;
      } else {
         const user=req.user
        const userproduct=await Userproduct.findOne({user:user._id})  
        userproduct.ordered=userproduct.carts
        userproduct.carts=[]
        await userproduct.save()
        res.redirect('/user/order-history')
      }
  });

  });

  router.post('/success/confirm',auth,async(req,res)=>{
      const user=req.user
      const userproduct=await Userproduct.findOne({user:user._id})  
      userproduct.ordered=userproduct.carts
      await userproduct.save()
      //res.redirect('/payment/success')
      res.send({ordered:userproduct.ordered,cart:userproduct.carts})
  })

module.exports=router