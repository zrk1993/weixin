var express = require('express');
var router = express.Router();
var URL = require('url');
var tuling=require('../bin/tuling');
/* GET home page. */
router.get('/', function(req, res, next) {
  var co;
  for(var key in  req.cookies){
    co+="cookie名:"+key;
    co+="cookie值:"+req.cookies[key]+"<br />";
  }
  res.render('test', { title: 'Express' ,cookie:co});
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
