/**
 * Created by RK on 2016/7/23.
 * wxMsgHandler 下的 各类事件处理方法，
 */
var wxMsg = require('./wxMsg');

function eventHand(msg,res) {
    // switch(msg.Event) {
    //     case "subscribe"://关注
    //         cb(wxMsg.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,msg.Event));
    //         break;
    //     case "unsubscribe"://取消关注
    //         cb(wxMsg.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,msg.Event));
    //         break;
    //     case "SCAN"://扫描带参数二维码事件 用户已关注时
    //         cb(wxMsg.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,msg.Event));
    //         break;
    //     case "LOCATION"://上报位置
    //         cb(wxMsg.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,msg.Event));
    //         break;
    //     case "CLICK"://自定义菜单点击事件
    //         cb(wxMsg.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,msg.Event));
    //         break;
    //     case "VIEW"://点击菜单跳转链接事件
    //         cb(wxMsg.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,msg.Event));
    //         break;
    //     default:
    //         cb(wxMsg.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,msg.Event));
    // }   
    return false;
}
module.exports=eventHand;