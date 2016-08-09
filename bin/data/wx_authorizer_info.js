/**
 * Created by RK on 2016/8/6.
 */
var config=require('../config');
var mysql      = require('mysql');

function aa() {

    var connection = mysql.createConnection({
        host     : config.dbHost,
        user     : config.dbUser,
        password : config.dbPassword
    });
    connection.connect();
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
    });
    connection.end();
}