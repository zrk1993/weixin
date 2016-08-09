/**
 * Created by RK on 2016/8/6.
 */
var mongoose =require('mongoose');
var Schema=mongoose.Schema;

var wx_message_cache=new Schema({
    openid:String,         //微信消息里的ToUserName
    createTime:String,    //微信消息里的CreateTime
    message:String        //微信消息
});

module.exports=wx_message_cache;