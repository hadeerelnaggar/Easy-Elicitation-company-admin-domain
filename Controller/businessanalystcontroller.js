var businessAnalystModel = require('../Model/businessAnalystModel');
var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
const bcrypt = require('bcryptjs')
var generator = require('generate-password');
const nodemailer = require("nodemailer");
var sendemail = require('../sendmail')
const crypto = require('crypto')

exports.checkEmail = async function (req, res) {
    var email = req.query.email;
    var result = await businessAnalystModel.getBAByEmail(email)
    if (result.length == 0)
        res.send("email doesn't exist")
    else {
        res.send("email already exists")
    }
}
exports.insertNewBusinessAnalyst = async function (req, res) {
    var name = req.body.name;
        var email = req.body.email;
        var companyName=req.session.companyName;
        //generates password for the new admin
        var password = generator.generate({
            length: 10,
            numbers: true
        });
    var hashedpassword = await bcrypt.hash(password, 12)
    var result = await businessAnalystModel.insertNewBusinessAnalyst(name,email,hashedpassword,companyName)
    var emailtext = "A new Account was created for you as a Business Analyst for the company "+companyName+" \n your usename is:"
                 + name + "\n your password is: " + password + "\n You can change the password anytime from your account \n"
    sendemail.sendToNewAdmin(email, "Easy Elicitation Business Analyst Account", emailtext)
    res.render("addbusinessanalyst");
};
exports.deleteBusinessAnalyst =async function (req, res) {
    var id = req.query.BAid;
    var result = await businessAnalystModel.deleteBusinessAnalyst(id);
    res.redirect('/getallbusinessanalysts');
};
exports.getAllBusinessAnalyst = async function (req, res) {
    var companyName = req.session.companyName;
    var result = await businessAnalystModel.getAllBusinessAnalyst(companyName);
    res.render('viewallbusinessanalysts', {
        result: result
    });
};




