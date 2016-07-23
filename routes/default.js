var express = require('express');
var router = express.Router();
var URL = require('url');
var tuling=require('../bin/weixin/tuling');
const low = require('lowdb')
const db = low('db.json')
var async = require('async');

var access=require('../bin/weixin/accessToken');

// Init
db.defaults({ post111: [] })
    .value()

// Define posts
const posts = db.get('posts')
/* GET home page. */
router.get('/low', function(req, res, next) {
  const post = posts
      .find({ id: req.params.id })
      .value()
  res.send(post)
});
router.get("/q", function (req,res) {
  async.waterfall([
    function(callback){
      callback('1', '2');
    },
    function(arg1, arg2, callback){
      console.log(arg1+"vvv"+arg2)
      callback(null, '3');
    },
    function(arg1, callback){
      console.log(arg1)
      callback(null, '4');
    }
  ], function (err, result) {
    if(!err)console.log(result);
  });
});

router.get("/tuling", function (req,res) {
  var arg = URL.parse(req.url, true).query;
  tuling.sya(1234555,arg.info,function (ans) {
    console.log("qqqqqq"+ans)
    res.send(JSON.parse(ans).text);
  });
});

module.exports = router;
