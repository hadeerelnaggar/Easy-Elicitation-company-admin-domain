var mysql = require('mysql');
var connection;
 function con(){
    connection = mysql.createConnection({
        host     : 'remotemysql.com',
        port     : '3306',
        user     : 'TBWURxMMlC',
        password : 'mDaLb01xcw',
        database : 'TBWURxMMlC'
    });
    connection.connect(function(err) 
    {
        if(err){
            throw err;
        } 
    });
}
con()
module.exports = connection;
