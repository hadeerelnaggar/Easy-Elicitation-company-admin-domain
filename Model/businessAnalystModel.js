var db = require('../databaseconnection');
var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
const bcrypt = require('bcryptjs')
var generator = require('generate-password');
const nodemailer = require("nodemailer");
var sendemail = require('../sendmail')
const crypto = require('crypto')
const util = require('util');
const query = util.promisify(db.query).bind(db);


module.exports = {
    getAllBusinessAnalyst: async function (companyName) {
        let sql = "SELECT * FROM businessanalyst WHERE companyName = ? ";
        let inserts = [companyName]
        sql = db.format(sql, inserts);
        const output = await query(sql);
        return output;
    },
    getBAByEmail: async function (email) {
        let sql = "SELECT * FROM businessanalyst WHERE email = ? ";
        let inserts = [email]
        sql = db.format(sql, inserts);
        const output = await query(sql);
        return output;

    },
    insertNewBusinessAnalyst: async function (name, email, hashedpassword, companyName) {
        let sql = "INSERT INTO businessanalyst (name,email,password,companyName) VALUES (?,?,?,?) ";
        let inserts = [name, email, hashedpassword, companyName]
        sql = db.format(sql, inserts);
        const output = await query(sql);
        return output;

    },
    deleteBusinessAnalyst: async function (id) {
        let sql = "DELETE FROM businessanalyst WHERE businessAnalystId = ? ";
        let inserts = [id]
        sql = db.format(sql, inserts);
        const output = await query(sql);
        return output;
    }
}

