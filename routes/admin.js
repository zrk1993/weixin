var express = require('express');
var router = express.Router();
var URL = require('url');
var config = require('../bin/config');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var selmenu=require("../bin/weixin/selfmenu");
//登录控制
router.use(function (req, res, next) {
    if (req.session.admin||true) {
        next();
    }
    else {
        if (req.body.adminname == config.username && req.body.password == config.password) {
            //登录成功
            req.session.admin=true;
            res.render("admin/home.html");
        }
        else {
            res.render("admin/login.html");
        }
    }
});
router.get('/',function (req, res) {
    var sess=req.session;
    sess.views++;
    res.send("sessionID"+req.sessionID+"secret"+req.secret+"views"+sess.views);
});
//自定义菜单
router.get('/selfmenu',function (req, res) {
    var menu= {
        "button":[
            {
                "type":"click",
                "name":"今日歌曲",
                "key":"V1001_TODAY_MUSIC"
            },
            {
                "name":"菜单",
                "sub_button":[
                    {
                        "type":"view",
                        "name":"搜索",
                        "url":"http://www.soso.com/"
                    },
                    {
                        "type":"view",
                        "name":"视频",
                        "url":"http://v.qq.com/"
                    },
                    {
                        "type":"click",
                        "name":"赞一下我们",
                        "key":"V1001_GOOD"
                    }]
            }]
    }
    res.render('admin/selfmenu.html',{selfmenu:JSON.stringify(menu)});
});
//自定义菜单
router.post('/selfmenu',function (req, res) {
    selmenu.setSelfMenu(req.body);
    res.send(selmenu.setSelfMenu(req.body)+req.body);
});
module.exports = router;
