const nodemailer=require('nodemailer')
const jwt=require('jsonwebtoken')

const mailverification=(emailid,id)=>{
    console.log('yes')
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'dk.ecerasystem@gmail.com',
            pass:'Welcome@1234'
        }
    })
    
    const token=jwt.sign({_id:id,type:'mailverification'},'thisismyjwtsecret')
    const url=`https://global-nostolgia.herokuapp.com/user/mailverification?token=${token}`
    // const url=`http://localhost:3000/user/mailverification?token=${token}`
    const mailOption={
        from:'dk.ecerasystem@gmail.com',
        to:emailid,
        subject:'Verify your gmail',
        // text:'verify your gmail'
        html:`<p>Click <a href=${url}>here</a> to verify your email</p>`
    }

    transporter.sendMail(mailOption,(err,data)=>{
        if(err){
            console.log('Mail not Sent')
        }else{
            console.log('Mail sent!')
        }
    })
}



const resetpassword=async(emailid)=>{
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'dk.ecerasystem@gmail.com',
            pass:'Welcome@1234'
        }
    })

    const token=jwt.sign({emailid,type:'resetpassword'},'thisismyjwtsecret')
    const url=`https://global-nostolgia.herokuapp.com/user/reset-password?token=${token}`
    // const url=`http://localhost:3000/user/reset-password?token=${token}`
    const mailOption={
        from:'dk.ecerasystem@gmail.com',
        to:emailid,
        subject:'Reset your passowrd',
        html:`<p>Click <a href=${url}>here</a> to reset your password</p>`
    }


    transporter.sendMail(mailOption,(err,data)=>{
        if(err){
            console.log('Mail not sent!!')
        }else{
            console.log('Mail sent!!')
        }
    })
}

module.exports={
    mailverification,
    resetpassword
}