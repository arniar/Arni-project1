var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('resetPassword');
});

router.post('/resetPasswordConfirm', async function(req, res) {
    if(isNaN(req.session.value)){
         req.session.password = req.body.newPassword;
         try {
             // Hash the password with a salt rounds of 10
             const salt = await bcrypt.genSalt(10);
             req.session.password = await bcrypt.hash(req.session.password, salt);
           } catch (error) {
            console.log(error);
           }
         await User.updateOne({email:req.session.value},{$set:{password:req.session.password}})
         res.send("success")
    }
    else{
        req.session.password = req.body.password;
         try {
             // Hash the password with a salt rounds of 10
             const salt = await bcrypt.genSalt(10);
             req.session.password = await bcrypt.hash(req.session.password, salt);
           } catch (error) {
            console.log(error)
           }
         User.updateOne({phone:req.session.value},{$set:{password:req.session.password}})
         res.send("success")
    }
});

module.exports = router;
