var express = require('express');
var router = express.Router();
const User = require('../models/user');
var emailOtp = require('../utilities/emailOtp')
const generateRandomOTP = require('../utilities/generateOtp');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('forgetPassword');
});

router.post('/sendOtp', async function(req, res) {
    req.session.value= req.body.emailOrPhone;
    if(isNaN(req.session.value)){
        const user = await User.findOne({ email: req.session.value });
        if (!user) {
            return res.redirect('/already');
        }
        req.session.otp = await generateRandomOTP();
     await emailOtp(req.session.otp, req.session.value);  // Send OTP to email or phone number
     setTimeout(() =>{
        delete req.session.otp;
        delete req.session.enteredOtp;
     },1000*60*60*10)
     res.redirect('/forgetPasswordOtp');
    }
    else{
        const user = await User.findOne({ phone : req.session.value });
        if (!user) {
            return res.redirect('/already');
        }
        req.session.otp = await generateRandomOTP();
     await emailOtp(req.session.otp, req.session.value);  // Send OTP to email or phone number
     setTimeout(() =>{
        delete req.session.otp;
        delete req.session.enteredOtp;
     },1000*60*60*10)
     res.redirect('/ForgetPasswordOtp');
    }
   
});



module.exports = router;
