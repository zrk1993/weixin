/**
 * Created by RK on 2016/7/7.
 * 微信消息处理
 */
var wxMsg = require('./wxMsg');
var tuling=require('./tuling');
var wxEventHand=require('./wxEventHand');

//wx消息处理，分析消息，再决定如何回复消息。
//res 嵌套的有点深啊，等我厉害了再来解决
function wxMsgHandler(msg,res) {
    switch(msg.MsgType)
    {
        case "text":
            tuling.sya(msg,function (answer) {
                console.log("answer"+answer);
                 res.send(answer);
            });
            break;
        case "image":

            break;
        case "voice":

            break;
        case "video":

            break;
        case "shortvideo":

            break;
        case "location":

            break;
        case "link":

            break;
        case "event":
            wxEventHand(msg,function (answer) {
                if(answer)res.send(answer);
                else {res.send("");}
            });
            break;
        default:
            res.send(wxMsg.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,"花开花落"));
            break;
            
    }
}
module.exports = wxMsgHandler;
