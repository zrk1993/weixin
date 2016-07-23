/**
 * Created by RK on 2016/7/23.
 * wxMsgHandler 下的 各类事件处理方法，
 */
var wxMsg = require('./wxMsg');

function eventHand(msg,cb) {
    switch(msg.Event) {
        case "subscribe"://关注

            break;
        case "unsubscribe"://取消关注

            break;
        case "SCAN"://扫描带参数二维码事件 用户已关注时

            break;
        case "LOCATION"://上报位置

            break;
        case "CLICK"://自定义菜单点击事件

            break;
        case "VIEW"://点击菜单跳转链接事件
            
            break;
        default:
            cb(wxMsg.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,msg.Event));
    }   
}
module.exports=eventHand;