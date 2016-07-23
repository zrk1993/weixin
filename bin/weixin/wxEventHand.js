/**
 * Created by RK on 2016/7/23.
 */
var wxMsgAnswer = require('./wxMsgAnswer');

function eventHand(msg,cb) {
    
    cb(wxMsgAnswer.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,msg.Event));
}
module.exports=eventHand;