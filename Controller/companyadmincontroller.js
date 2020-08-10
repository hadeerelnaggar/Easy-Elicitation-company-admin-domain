var companyAdminModel = require('../Model/companyAdminModel');
var crypto = require("crypto")
const bcrypt = require('bcryptjs')
var generator = require('generate-password');
var sendemail = require('../sendmail')


exports.login = async function (req, res) {
    var email = req.body.email;
    var result = await companyAdminModel.getCompanyAdminByEmail(email);
    if (result.length == 0) {
        res.send("Invalid email or password")
    }
    else {
        //compare given password from req with the hashed password saved in database
        bcrypt.compare(req.body.password, result[0].password)
            .then(match => {
                if (!match) {
                    res.send("Invalid email or password")
                }
                else { //Add admin name and email to the session
                    req.session.name = result[0].name;
                    req.session.email = result[0].email;
                    req.session.id = result[0].companyAdminId;
                    req.session.companyName = result[0].companyName;
                    req.session.save()
                    res.send("successfully loggedin")
                }
            })

    }
};

exports.editpassword = async function (req, res) {
    var result = await companyAdminModel.getCompanyAdminByEmail(req.session.email)
    if (result.length == 0) {
        res.send("user not found")
    }
    var match = await bcrypt.compare(req.body.oldpassword, result[0].password)
    if (!match) {
        res.send("wrong old password")
    }
    else {
        var hashedpassword = await bcrypt.hash(req.body.newpassword, 12)
        var result = await companyAdminModel.updatePassword(hashedpassword, req.session.email)
        res.send("ok")
    }
},
    //called when forgot password
    exports.sendresetpasswordemail = function (req, res) {
        var result = companyAdminModel.getCompanyAdminByEmail(req.query.email)
        if (result.length == 0) {
            res.send("user not found")
        }
        else {
            crypto.randomBytes(32, async (err, buffer) => {
                if (err) console.log(err)
                else {
                    const token = buffer.toString("hex")
                    var email = req.query.email
                    var expireToken = Date.now() + 3600000
                    var updateresult = await companyAdminModel.updateCompanyAdminTokenAndExpireToken(token, expireToken, email);
                    var emailsubject = "please reset your password"
                    var emailtext = "Please use the following link to reset your password \n"
                        + req.protocol + '://' + req.get('host') + "/resetpassword/" + token + "?email=" + email
                    sendemail.sendToNewAdmin(email, emailsubject, emailtext)
                    res.send("please check your email to reset password")
                }
            })
        }
    },
    //called by the link sent on email
    exports.resetpassword = async function (req, res) {
        var newpassword = req.body.password
        var email = req.body.email
        var token = req.body.token
        var result = await companyAdminModel.getCompanyAdminByEmailAndToken(email, token)
        var expireToken = result[0].expireToken;
        if (parseInt(expireToken) >= parseInt(Date.now().toString())) {
            var hashedpassword = await bcrypt.hash(newpassword, 12)
            var final_result = await companyAdminModel.resetPassword(hashedpassword, email)
            res.redirect('/')
        }
    }
