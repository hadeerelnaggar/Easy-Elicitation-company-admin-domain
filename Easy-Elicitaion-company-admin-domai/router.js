var express = require('express');
var router = express.Router();

var businessanalystcontroller = require('./Controller/businessanalystcontroller');
var companyadmincontroller = require('./Controller/companyadmincontroller');


console.log('Router Activated:....');

router.get('/', function (req, res) {
   if (req.session.username) {
      res.redirect('/newbusinessanalyst')
   }
   else {
      res.render('LogincompanyAdmin')
   }
})
router.get('/forgotpassword', function (req, res) {
   res.render('forgotpasswordpage')
})
router.get('/editpasswordpage', function (req, res) {
   res.render('Editpassword')
})
router.get('/newbusinessanalyst', function (req, res) {
   res.render('addbusinessanalyst');
})
router.get('/logout', function (req, res) {
   req.session.destroy();
   res.redirect('/');
})
router.get('/resetpassword/:token', function (req, res) {

   var token = req.params.token
   var email = req.query.email
   res.render('newpassword', {
      token: token,
      email: email
   })

})

/**----------business analyst---------- **/
router.get('/getallbusinessanalysts', businessanalystcontroller.getAllBusinessAnalyst);
router.post('/login', companyadmincontroller.login);
router.post('/insertnewbusinessanalyst', businessanalystcontroller.insertNewBusinessAnalyst);
router.get('/deletebusinessanalyst', businessanalystcontroller.deleteBusinessAnalyst);
router.post('/editpassword', companyadmincontroller.editpassword)
router.get('/checkemail', businessanalystcontroller.checkEmail)
router.get('/sendresetpasswordemail', companyadmincontroller.sendresetpasswordemail)
router.post('/resetpassword', companyadmincontroller.resetpassword)

module.exports = router;