var db = require('../databaseconnection');
var express = require('express');
var path = require('path');
var app = express();
var crypto = require("crypto")
const bcrypt = require('bcryptjs')
var generator = require('generate-password');
var sendemail = require('../sendmail')
const util = require('util');
const query = util.promisify(db.query).bind(db);

module.exports = {
    getCompanyAdminByEmail: async function (email) {
        let sql = "SELECT * FROM companyadmin WHERE email = ? ";
        let inserts = [email]
        sql = db.format(sql, inserts);
        const output = await query(sql);
        return output;
    },
    updatePassword: async function (hashedpassword, email) {
        let sql = "update companyadmin set password = ? where email = ? "
        let inserts = [hashedpassword, email]
        sql = db.format(sql, inserts);
        const output = await query(sql);
        return output;
    },
    getCompanyAdminByEmailAndToken: async function (email, token) {
        let sql = "select * from companyadmin where email = ? and resetPasswordToken = ? "
        let inserts = [email, token]
        sql = db.format(sql, inserts);
        const output = await query(sql);
        return output;
    },
    resetPassword: async function (hashedpassword, email) {
        let sql = "update companyadmin set password = ? ,resetPasswordToken = null , expireToken = null where email = ? "
        let inserts = [hashedpassword, email]
        sql = db.format(sql, inserts);
        const output = await query(sql);
        return output;
    },
    updateCompanyAdminTokenAndExpireToken : async function(token,expiretoken,email){
        let sql = "update companyadmin set resetPasswordToken = ? ,expireToken = ? where email = ? "
        let inserts = [token,expiretoken, email]
        sql = db.format(sql, inserts);
        const output = await query(sql);
        return output;
    },
}