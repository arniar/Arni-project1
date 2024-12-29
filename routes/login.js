var express = require('express');
var router = express.Router();
const User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/loginAuth', async function(req, res) {
    req.session.value = req.body.emailOrPhone;
    req.session.password = req.body.password;
    const user = await User.findOne({ email: req.session.value });
        if (!user) {
        return res.redirect('/already.js');
        }
    const isMatch = await user.comparePassword(req.session.password)
    if(isMatch){
        return res.redirect('/landing');
    }
    else{
        const user = await User.findOne({ phone: req.session.value });
        if (!user) {
        return res.redirect('/already.js');
        }
    const isMatch = await user.comparePassword(req.session.password)
    if(isMatch){
        return res.redirect('/landing');
    }
    }
})

module.exports = router;
