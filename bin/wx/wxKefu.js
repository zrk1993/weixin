/**
 * Created by RK on 2016/7/30.
 */
var ChatService=require('../chat/ChatService');
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
function sendMsg(openid) {
    return true;
}
function acceptMsg(msg) {
    ChatService.sendMsg(msg)
}
module.exports=kefu