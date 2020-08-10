var express = require('express');
var app = express();

var session = require('express-session');
var ejs = require('ejs');
app.set('view engine', 'ejs');
var db= require('./databaseconnection.js');
var router = require('./router');
var bodyParser = require('body-parser');
app.use('/css',express.static(__dirname +'/css'));
app.set('views', __dirname + '/View');
//app.use(session({cookieName: 'session', secret:'$0_$3cR37_K3Y'}));
app.use(session({
   cookie: {
     path    : '/',
     httpOnly: true,
     maxAge  : 24*60*60*1000
   },
   saveUninitialized: true,
   secret: '1234567890QWERT',
   cookie: { secure: false },
   resave: false
 }));


app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", 'http://localhost:8081'); // update to match the domain you will make the request from

   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

   res.setHeader('Access-Control-Allow-Credentials', true);
   
   next();
   
 });
 app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
 app.use('/',router); 

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port   
   console.log("app listening at http://:%s", port)
})



