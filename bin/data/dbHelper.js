/**
 * Created by RK on 2016/7/12.
 */
var config=require('../config');
var mysql = require('mysql');

function connection() {
    var connection = mysql.createConnection({
        host     : config.dbHost,
        user     : config.dbUser,
        password : config.dbPassword,
        database : config.database
    });
}

var dbHelper={
    getConnection:connection
};

module.exports=dbHelper;