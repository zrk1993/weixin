/**
 * Created by RK on 2016/7/7.
 */
function messageHandler(msg) {
    var FromUserName=msg.FromUserName,
        ToUserName=msg.ToUserName,
        CreateTime=msg.CreateTime,
        MsgType=msg.MsgType,
        result;
    switch(MsgType)
    {
        case "text":
            result="<xml>"+
                "<ToUserName><![CDATA["+FromUserName+"]]></ToUserName>"+
                "<FromUserName><![CDATA["+ToUserName+"]]></FromUserName>"+
                "<CreateTime>12345678</CreateTime>"+
                "<MsgType><![CDATA[text]]></MsgType>"+
                "<Content><![CDATA[wocao]]></Content>"+
                "</xml>";

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
        default:
            ;
    }

    result="<xml>"+
        "<ToUserName><![CDATA["+FromUserName+"]]></ToUserName>"+
        "<FromUserName><![CDATA["+ToUserName+"]]></FromUserName>"+
        "<CreateTime>111112</CreateTime>"+
        "<MsgType><![CDATA[text]]></MsgType>"+
        "<Content><![CDATA[wocao]]></Content>"+
        "</xml>";
    console.log(result);
    return result;
}
module.exports = messageHandler;