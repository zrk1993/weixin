/**
 * Created by RK on 2016/7/30.
 */
var ChatService=require('../chat/ChatService');
var request = require('request');
var util=require('util');
var accessToken = require('./accessToken');
//判断是否接入客服，@openid
var kefu={
    isConnect:isConnect,
    sendMsg:sendMsg,
    acceptMsg:acceptMsg
};
function isConnect(msg) {
    acceptMsg(msg);
    return true;
}
function sendMsg(wxKefuMsg) {
    var api="https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=%s";    
    accessToken.getAccessToken(function (AccessToken) {
        request.post(util.format(api,accessToken), wxKefuMsg)
    });
}
function acceptMsg(msg) {
    ChatService.sendMsg(msg)
}
module.exports=kefu