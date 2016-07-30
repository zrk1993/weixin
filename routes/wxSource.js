var express = require('express');
var router = express.Router();
var config = require('../bin/config');
var session = require('express-session');
var wxSourceManage = require('../bin/wx/wxSourceManage');

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
//素材管理页面
router.get('/', function (req, res) {
    res.render("wx/Imgsource.html");
});
//素材上传接口
router.get('/upload', function (req, res) {
    wxSourceManage
});
//素材获取
router.get('/get', function (req, res) {
    var id = "Utcg1i0H1IvxHrv4qcPI5JlSrc9TV8joaJW19c0g0sNzjbv-W4nPkQqaWnS59xmg";
     wxSourceManage.getTempSourceStream(id,function (stream) {
         stream.pipe(res);
     });
});
router.get('/getURL', function (req, res) {
    var id = "Utcg1i0H1IvxHrv4qcPI5JlSrc9TV8joaJW19c0g0sNzjbv-W4nPkQqaWnS59xmg";
    wxSourceManage.getTempSourceURL(id,function (url) {
        res.end(url);
    })
});
module.exports = router;
