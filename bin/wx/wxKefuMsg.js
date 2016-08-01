/**
 * Created by RK on 2016/8/1.
 */

/**
 * 请注意，如果需要以某个客服帐号来发消息（在微信6.0.2及以上版本中显示自定义头像），
 * 则需在JSON数据包的后半部分加入customservice参数，例如发送文本消息则改为：
 * {
    "touser":"OPENID",
    "msgtype":"text",
    "text":
    {
         "content":"Hello World"
    },
    "customservice":
    {
         "kf_account": "test1@kftest"
    }
 */
var wxKefuMsg={
    text:function (openid,content) {
        return {
                    "touser":openid,
                    "msgtype":"text",
                        "text":
                    {
                        "content":content
                    }
                };
    },
    image:function (openid,media_id) {
        return {
                    "touser":openid,
                    "msgtype":"image",
                    "image":
                    {
                        "media_id":media_id
                    }
                };
    },
    voice:function (openid,media_id) {
        return {
                    "touser":openid,
                    "msgtype":"voice",
                    "voice":
                    {
                        "media_id":media_id
                    }
                }
    },
    video:function (openid,media_id,thumb_media_id,title,description) {
        return {
                    "touser":openid,
                    "msgtype":"video",
                    "video":
                    {
                        "media_id":media_id,
                        "thumb_media_id":thumb_media_id,
                        "title":title,
                        "description":description
                    }
                };
    },
    music:function (openid,title,description,musicurl,hqmusicurl,thumb_media_id) {
        return {
                    "touser":openid,
                    "msgtype":"music",
                    "music":
                    {
                        "title":title,
                        "description":description,
                        "musicurl":musicurl,
                        "hqmusicurl":hqmusicurl,
                        "thumb_media_id":thumb_media_id
                    }
                };
    },
    news:function(){},
    mpnews:function(){},
    wxcard:function(){},
    mpnews:function(){},
};
module.exports = wxKefuMsg;