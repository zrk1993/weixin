var express = require('express');
var router = express.Router();
var async = require('async');
var URL = require('url');
var config = require('../bin/config');
var session = require('express-session');
var wxSelmenu = require("../bin/wx/wxSelfmenu");

//登录控制
router.use(function (req, res, next) {
    if (req.session.admin || true) {
        next();
    }
    else {
        if (req.body.adminname == config.username && req.body.password == config.password) {
            //登录成功
            req.session.admin = true;
            res.render("wx/home.html");
        }
        else {
            res.render("wx/login.html");
        }
    }
});
//自定义菜单
router.get('/', function (req, res) {
    wxSelmenu.getSelfMenu(function (err, result) {
        res.render('wx/selfmenu.html', {selfmenu: result});
    })
});
//创建自定义菜单
router.post('/', function (req, res) {
    wxSelmenu.setSelfMenu(JSON.stringify(req.body), function (err, result) {
        if (err) {
            res.send("erro");
        }
        else {
            res.send(result);
        }
    });
});

module.exports = router;
