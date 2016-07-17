/**
 * Created by RK on 2016/7/12.
 */
var mysql   = require('mysql');
var connection = mysql.createConnection({
    host   : 'localhost',
    user   : 'root',
    password : 'zxcvbnm8',
    database : 'my_db'
});
exports.init=function () {
    
};