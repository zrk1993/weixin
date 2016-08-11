/**
 * Created by RK on 2016/8/7.
 */
var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var myMongoose=require('../bin/data/myMongoose');

//用户登录
router.post('/signIn', function(req, res) {
    var arg = req.arg;
    var arr = [];
    req.on("data",function(data){
        arr.push(data);
    });
    req.on("end",function(){
        var data= Buffer.concat(arr).toString();
        parseString(data, { explicitArray : false, ignoreAttrs : true }, function (err, result) {
            if (err){
                console.log("weixin.js xml to json err");
            }
            else {
            }
        });
    })
});

//用户注册
router.post('/signUp', function(req, res) {
    var arg = req.arg;
    var arr = [];
    req.on("data",function(data){
        arr.push(data);
    });
    req.on("end",function(){
        var data= Buffer.concat(arr).toString();

        parseString(data, { explicitArray : false, ignoreAttrs : true }, function (err, result) {
            if (err){
                console.log("weixin.js xml to json err");
            }
            else {
            }
        });
    })
});

//用户获取accesstoken
router.post('/getAccessToken', function(req, res) {

});

router.get('/test', function(req, res) {
    var db = myMongoose;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (callback) {
        // yay!
        console.log("open");
        var a=req.body;
        res.end(a)
    });
});
router.post('/test', function(req, res) {
    var a=req.query.a;
    res.end(a)
});


module.exports = router;
