var express = require('express');
var router = express.Router();
var URL = require('url');
var tuling=require('../bin/weixin/tuling');
const low = require('lowdb')
const db = low('db.json')

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
router.post("/", function (req,res) {
  for(var key in  req.cookies){
    res.write("cookie名:"+key);
    res.write(",cookie值:"+req.cookies[key]+"<br />");
  }
  res.end();
});

router.get("/tuling", function (req,res) {
  var arg = URL.parse(req.url, true).query;
  tuling.sya(1234555,arg.info,function (ans) {
    console.log("qqqqqq"+ans)
    res.send(JSON.parse(ans).text);
  });
});

module.exports = router;
