var express = require('express');
var router = express.Router();
var URL = require('url');
var config=require('../bin/config');
var session = require('express-session');
var cookieParser = require('cookie-parser');

/* GET home page. */
router.get('/', function(req, res) {
  var co;
  for(var key in  req.cookies){
    co+="cookie名:"+key;
    co+="cookie值:"+req.cookies[key]+"<br />";
  }
  res.render('test', { title: 'Express' ,cookie:co});
});
router.get('/login', function(req, res) {
  var arg = URL.parse(req.url, true).query;
  if(arg.adminname===config.username&&arg.password==config.password){
    req.session.loginname=config.username;
    res.send("ok"+req.session.loginnam);
  }else {
    res.sendfile("./public/admin/login.html")
  }
});
module.exports = router;
