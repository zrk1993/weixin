
var config = require('./config.js');
var mongoose = require('mongoose');

var init=function() {
    
    mongoose.connect('mongodb://localhost/mydb');
    

};
module.exports = init;
