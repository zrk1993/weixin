/**
 * Created by RK on 2016/7/12.
 */
var config=require('../config');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydb');

module.exports = mongoose;
