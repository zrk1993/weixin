var express = require('express');
var router = express.Router();
var URL = require('url');
var crypto = require('crypto');
var parseString = require('xml2js').parseString;
var wxMsgHandler = require('../bin/weixin/wxMsgHandler');

var token = "zhengrenkun"; //微信验证token

//中间件 判断消息是否来自微信。并且将请求参数格式化为json,保存在 req.arg
router.use('/',function (req,res,next) {
    var arg = URL.parse(req.url, true).query;
    if(isFromWeixin(arg)){
        req.arg = arg;
        next();
    }else {
      res.status(err.status || 500);
      res.render('error', {
        message: "you are not wechat",
        error: err
      });
    }
});

//微信的验证
router.get('/', function(req, res) {
    res.send(req.arg["echostr"]);
});

//接收微信消息,并处理
router.post('/', function(req, res) {
    var arg = req.arg;
    var arr = [];
    req.on("data",function(data){
        arr.push(data);
    });
    req.on("end",function(){
        var data= Buffer.concat(arr).toString();
        parseString(data, { explicitArray : false, ignoreAttrs : true }, function (err, result) {
            if (err){
                console.log("xml to json err");
            }
            else {data=result;
                console.log("0");
                wxMsgHandler(data.xml,res);//微信消息处理. data.xml->微信消息....这里不负责发送响应。
                console.log("1");
            }
        });
    })
});
//通过对签名的效验，来判断此条消息的真实性,是否来自微信。
function isFromWeixin(arg) {
    var signature = arg["signature"],
        timestamp = arg["timestamp"],
        nonce = arg["nonce"],
        echostr = arg["echostr"];

    /*  加密/校验流程如下： */
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    var array = [token,timestamp,nonce];
    array.sort();
    var str = array.toString().replace(/,/g,"");

    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str,'utf-8').digest("hex");

    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if(code===signature){
        return true;
    }else{
        return  false;
    }
}
module.exports = router;
