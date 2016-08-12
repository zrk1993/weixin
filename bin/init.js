
var config = require('./config.js');
var mongoose = require('mongoose');

var init=function() {

    mongooseConnect();

};
function mongooseConnect() {
    mongoose.connect('mongodb://localhost/mydb');
    mongoose.connection.on('error', function () {
        console.log('mongodb open err');
    });
    mongoose.connection.once('open', function () {
        console.log('mongodb open succeed');
    });
}
module.exports = init;
