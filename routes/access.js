/**
 * Created by RK on 2016/8/7.
 */
var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var mongoose=require('mongoose');
var user_account_Schema=require('../bin/data/schema/user_account');

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
    var user_account_model=mongoose.model("user_account",user_account_Schema);
    var user_account_entity=new user_account_model({
        email:'renkun@qq.com',
        password:'zxcvbnm8',
        signUpTime:'12209021',
        name:'renkun',
        tel:'1212121212'});
    user_account_entity.save(function (err,userAccount) {
        if(err){console.log("保存失败")}
        else {
            console.log(JSON.stringify(userAccount));
        }
    });
    
    user_account_model.find(function (err,userAccounts) {
        if(err){
            console.log('查询失败')
        }else {
            console.log(userAccounts);
        }
    });
});
router.post('/test', function(req, res) {
    var a=req.query.a;
    res.end(a)
});


module.exports = router;
