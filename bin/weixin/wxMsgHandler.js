/**
 * Created by RK on 2016/7/7.
 */
var wxMsgAnswer = require('./wxMsgAnswer');
//wx消息处理，分析消息，再决定如何回复消息。
//res 嵌套的有点深啊，等我厉害了再来解决
function wxMsgHandler(msg,res) {
    switch(msg.MsgType)
    {
        case "text":
            tuling.sya(msg,function (answer) {                
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

            break;
        default:
            ;
    }
}
module.exports = wxMsgHandler;