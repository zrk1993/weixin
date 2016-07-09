/**
 * Created by RK on 2016/7/9.
 */
//图灵机器人 网址http://www.tuling123.com/ 绑定qq 1051455824
var http = require('http');
var qs = require('querystring');

var api_hostname="www.tuling123.com",
    api_path="/openapi/api",
    APIKey="c2f140e4f9584d9fa7add296b5ccf56e",
    secret="de8a698ee4c0ece3";

var tuling={
    sya:function (userid,info,answer) {
        var post_data = {
            key:APIKey,
            info:info,
            loc:"厦门市",
            userid:"123456"
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
            res.on('data', function (chunk) {
                answer(chunk);
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
module.exports = tuling;


