/**
 * Created by RK on 2016/7/9.
 */
//图灵机器人 网址http://www.tuling123.com/ 绑定qq 1051455824 shouji 15159041052
var http = require('http');
var qs = require('querystring');
var wxMsgAnswer = require('./weixin/wxMsgAnswer');

var api_hostname="www.tuling123.com",
    api_path="/openapi/api",
    APIKey="96f38eeb062fdac768072c4a7e75ab66",
    secret="3d8931320276acc1";

var tuling={
    sya:function (msg,answer) {
        var post_data = {
            key:APIKey,
            info:msg.Content,
            loc:"厦门市",
            userid:msg.FromUserName
        };

        var content = qs.stringify(post_data);

        var options = {
            hostname: api_hostname,
            port: 80,
            path: api_path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };

        var req = http.request(options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (data) {
                console.log("tuling"+data);
                answer(pase(msg,JSON.parse(data)));
            });
        });

        req.on('error', function (e) {
            console.log('tuling problem with request: ' + e.message);
        });

        // write data to request body
        req.write(content);
        req.end();
    }
};
//根据图灵返回的code类型 构建出消息
function pase(msg,data) {
    var result;
    switch(data.code)
    {
        case 100000://文本
            result=wxMsgAnswer.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,data.text);
            break;
        case 200000://链接
            result=wxMsgAnswer.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,data.text+"/br"+data.url);
            break;
        case 302000://新闻
            var news=[];
            for (var i;i<data.list.length&&i<10;i++){
                var item={};
                item["Description"]=data.list[i].article;
                item["Title"]=data.list[i].source;
                item["PicUrl"]=data.list[i].icon;
                item["Url"]=data.list[i].detailurl;
                news.push(item);
            }
            console.log("i"+i);
            result=wxMsgAnswer.news(msg.FromUserName,msg.ToUserName,msg.CreateTime,news);
            break;

        default:
            result=wxMsgAnswer.text(msg.FromUserName,msg.ToUserName,msg.CreateTime,data.text);
            ;
    }
    return result;
}
module.exports = tuling;


