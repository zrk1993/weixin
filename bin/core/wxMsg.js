/**
 * Created by RK on 2016/7/7.
 */
//封装成微信要求的消息格式
var wxMsg={
    text:function (ToUserName,FromUserName,CreateTime,Content) {
        return "<xml>"+
                    "<ToUserName><![CDATA["+ToUserName+"]]></ToUserName>"+
                    "<FromUserName><![CDATA["+FromUserName+"]]></FromUserName>"+
                    "<CreateTime>"+CreateTime+"</CreateTime>"+
                    "<MsgType><![CDATA[text]]></MsgType>"+
                    "<Content><![CDATA["+Content+"]]></Content>"+
            "</xml>";
    },
    image:function (ToUserName,FromUserName,CreateTime,MediaId) {
        return "<xml>"+
                    "<ToUserName><![CDATA["+ToUserName+"]]></ToUserName>"+
                    "<FromUserName><![CDATA["+FromUserName+"]]></FromUserName>"+
                    "<CreateTime>"+CreateTime+"</CreateTime>"+
                    "<MsgType><![CDATA[image]]></MsgType>"+
                    "<Image>"+
                        "<MediaId><![CDATA["+MediaId+"]]></MediaId>"+
                    "</Image>"+
                "</xml>";
    },
    voice:function (ToUserName,FromUserName,CreateTime,MediaId) {
        return "<xml>"+
                    "<ToUserName><![CDATA["+ToUserName+"]]></ToUserName>"+
                    "<FromUserName><![CDATA["+FromUserName+"]]></FromUserName>"+
                    "<CreateTime>"+CreateTime+"</CreateTime>"+
                    "<MsgType><![CDATA[voice]]></MsgType>"+
                    "<Voice>"+
                        "<MediaId><![CDATA["+MediaId+"]]></MediaId>"+
                    "</Voice>"+
                "</xml>";
    },
    video:function (ToUserName,FromUserName,CreateTime,MediaId,Title,Description) {
        return "<xml>"+
                    "<ToUserName><![CDATA["+ToUserName+"]]></ToUserName>"+
                    "<FromUserName><![CDATA["+FromUserName+"]]></FromUserName>"+
                    "<CreateTime>"+CreateTime+"</CreateTime>"+
                    "<MsgType><![CDATA[video]]></MsgType>"+
                    "<Video>"+
                        "<MediaId><![CDATA["+MediaId+"]]></MediaId>"+
                        "<Title><![CDATA["+Title+"]]></Title>"+
                        "<Description><![CDATA["+Description+"]]></Description>"+
                    "</Video>"+
                "</xml>";
    },
    music:function (ToUserName,FromUserName,CreateTime,Title,Description,MusicURL,HQMusicUrl,ThumbMediaId) {
        return "<xml>"+
            "<ToUserName><![CDATA["+ToUserName+"]]></ToUserName>"+
            "<FromUserName><![CDATA["+FromUserName+"]]></FromUserName>"+
            "<CreateTime>"+CreateTime+"</CreateTime>"+
            "<MsgType><![CDATA[music]]></MsgType>"+
            "<Music>"+
                "<Title><![CDATA["+Title+"]]></Title>"+
                "<Description><![CDATA["+Description+"]]></Description>"+
                "<MusicURL><![CDATA["+MusicURL+"]]></MusicURL>"+
                "<HQMusicUrl><![CDATA["+HQMusicUrl+"]]></HQMusicUrl>"+
                "<ThumbMediaId><![CDATA["+ThumbMediaId+"]]></ThumbMediaId>"+
            "</Music>"+
            "</xml>";
    },
    news:function (ToUserName,FromUserName,CreateTime,items) {
        var articles="";
        for(var i=0;i<items.length;i++){
            articles+="<item>"+
                        "<Title><![CDATA["+items[i].Title+"]]></Title>"+
                        "<Description><![CDATA["+items[i].Description+"]]></Description>"+
                        "<PicUrl><![CDATA["+items[i].PicUrl+"]]></PicUrl>"+
                        "<Url><![CDATA["+items[i].Url+"]]></Url>"+
                      "</item>";
        }
        return "<xml>"+
            "<ToUserName><![CDATA["+ToUserName+"]]></ToUserName>"+
            "<FromUserName><![CDATA["+FromUserName+"]]></FromUserName>"+
            "<CreateTime>"+CreateTime+"</CreateTime>"+
            "<MsgType><![CDATA[news]]></MsgType>"+
            "<ArticleCount>"+items.length+"</ArticleCount>"+
            "<Articles>"+
                articles+
            "</Articles>"+
            "</xml>";
    }
};
module.exports = wxMsg;
