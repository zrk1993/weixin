
var config = require('./config.js');
var mongoose = require('mongoose');

var init=function() {
    
    mongoose.connect('mongodb://localhost/mydb');
    mongoose.connection.on('error', function () {
        console.log('mongodb open err');
    });
    mongoose.connection.once('open', function (callback) {
        console.log('mongodb open succeed');
    });

};
module.exports = init;
