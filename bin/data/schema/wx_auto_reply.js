/**
 * Created by RK on 2016/8/7.
 */
var mongoose =require('mongoose');
var Schema=mongoose.Schema;

var wx_auto_reply=new Schema({
    openid:String,      //微信消息里的ToUserName
    keyword:[{wxRegex:String,replyType:String,replyContent:String}], //关键字自动回复[{正则，回复消息类型，回复内容}]
    event:[{wxEvent:String,replyType:String,replyContent:String}]    //事件自动回复[{事件，回复消息类型，回复内容}]
});

module.exports=wx_auto_reply;