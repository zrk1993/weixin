var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

/* GET home page. */

router.get('/', function(req, res, next) {
    var xml = "<xml><ToUserName><![CDATA[gh_c5424fbd0ab4]]></ToUserName>"+
        "<FromUserName><![CDATA[oMfakw2YWf0Xed30QEgCgdDj4l5E]]></FromUserName>"+
        "<CreateTime>1467630767</CreateTime>"+
        "<MsgType><![CDATA[text]]></MsgType>"+
        "<Content><![CDATA[iii]]></Content>"+
        "<MsgId>6303426147415962977</MsgId>"+
        "</xml>";
    parseString(xml, function (err, result) {
        var s=messageHandler(result);
        res.send(s);
    });
});
function messageHandler(result) {
    return result;
}
module.exports = router;
