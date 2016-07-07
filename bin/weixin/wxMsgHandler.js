/**
 * Created by RK on 2016/7/7.
 */
var wxMsgAnswer = require('./wxMsgAnswer');
//wx消息处理，分析消息，再决定如何回复消息。
function wxMsgHandler(msg) {
    var result;
    switch(msg.MsgType)
    {
        case "text":
            result=wxMsgAnswer.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,msg.Content)
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

            break;
        default:
            ;
    }
    console.log(result);
    return result;
}
module.exports = wxMsgHandler;