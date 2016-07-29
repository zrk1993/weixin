var express = require('express');
var router = express.Router();
var async = require('async');
var URL = require('url');
var config = require('../bin/config');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var selmenu = require("../bin/core/selfmenu");
var accesstoken = require("../bin/core/accessToken");
var wxSourceManage = require('../bin/core/wxSourceManage');
var fs = require('fs');
var request = require('request');
//登录控制
router.use(function (req, res, next) {
    if (req.session.admin || true) {
        next();
    }
    else {
        if (req.body.adminname == config.username && req.body.password == config.password) {
            //登录成功
            req.session.admin = true;
            res.render("admin/home.html");
        }
        else {
            res.render("admin/login.html");
        }
    }
});
router.get('/', function (req, res) {
    var sess = req.session;
    sess.views++;
    res.send("sessionID" + req.sessionID + "secret" + req.secret + "views" + sess.views);
});
//自定义菜单
router.get('/selfmenu', function (req, res) {
    selmenu.getSelfMenu(function (err, result) {
        res.render('admin/selfmenu.html', {selfmenu: result});
    })
});
//自定义菜单
router.post('/selfmenu', function (req, res) {
    selmenu.setSelfMenu(JSON.stringify(req.body), function (err, result) {
        if (err) {
            res.send("erro");
        }
        else {
            res.send(result);
        }
    });
});
//自定义菜单
router.get('/Imgsource', function (req, res) {
    accesstoken.getAccessToken(function (accesstoken) {
        var imgupload = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=" + accesstoken + "&type=image";
        res.render("admin/Imgsource.html", {imgupload: imgupload});
    })
});

router.get('/upload', function (req, res) {
    wxSourceManage.uploadTempSourceBuff("image",
        fs.createReadStream('./bin/core/ab.jpg'),
        function (err, body) {
            console.log(err + body)
        }
    )

});


router.get('/getsource', function (req, res) {
    var id = "Utcg1i0H1IvxHrv4qcPI5JlSrc9TV8joaJW19c0g0sNzjbv-W4nPkQqaWnS59xmg";
    // wxSourceManage.getTempSourceStream(id,function (stream) {
    //     stream.pipe(res);
    // })
    wxSourceManage.getTempSourceURL(id,function (url) {
        res.end(url);
    })
});
module.exports = router;
