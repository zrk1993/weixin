var express = require('express');
var URL = require('url');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var arg = URL.parse(req.url, true).query;
    res.send(checkSignature(arg));
});
//检验signature对请求进行校验（下面有校验方式）。若确认此次GET请求来自微信服务器，请原样返回echostr参数内容
function checkSignature(arg) {
    $signature = arg["signature"];
    $timestamp = arg["timestamp"];
    $nonce = arg["nonce"];
    return $signature;
}
module.exports = router;
