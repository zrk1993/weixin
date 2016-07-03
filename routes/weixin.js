var express = require('express');
var URL = require('url');
var crypto = require('crypto');
var router = express.Router();

var token = "zhengrenkun"; //此处需要你自己修改
/* GET users listing. */
router.get('/', function(req, res, next) {
    var arg = URL.parse(req.url, true).query;
    res.send(checkSignature(arg));
});
//检验signature对请求进行校验（下面有校验方式）。若确认此次GET请求来自微信服务器，请原样返回echostr参数内容
function checkSignature(arg) {
    var signature = arg["signature"],
        timestamp = arg["timestamp"],
        nonce = arg["nonce"],
        echostr = arg["echostr"];

    /*  加密/校验流程如下： */
    //1. 将token、timestamp、nonce三个参数进行字典序排序
    var array = new Array(token,timestamp,nonce);
    array.sort();
    var str = array.toString().replace(/,/g,"");

    //2. 将三个参数字符串拼接成一个字符串进行sha1加密
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str,'utf-8').digest("hex");

    //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if(code===signature){
        return echostr;
    }else{
        return  "error";
    }
}
module.exports = router;
