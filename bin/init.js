
var config = require('./config.js');
var mongoose = require('mongoose');

var init=function() {

    mongooseConnect();

};

function mongooseConnect() {

    var mongoose = require('mongoose')
        , connectionString = 'mongodb://localhost/mydb'
        , options = {};

    options = {
        server: {
            auto_reconnect: true
            //poolSize: 10
        }
    };

    mongoose.connect(connectionString, options, function(err, res) {
        if(err) {
            console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
        } else {
            console.log('[mongoose log] Successfully connected to: ' + connectionString);
        }
    });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'mongoose connection error:'));
    db.once('open', function callback () {
        console.log('mongoose open success');
    });
}

module.exports = init;
