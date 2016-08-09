/**
 * Created by RK on 2016/8/7.
 */
var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

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

module.exports = router;
