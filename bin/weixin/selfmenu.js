/**
 * Created by RK on 2016/7/17.
 */
var http = require('http');
var accessToken=require('./accessToken');

var self_host="https://api.weixin.qq.com";
var self_path="/cgi-bin/menu/create?access_token=";
exports.setSelfMenu=function (selfmenu) {
    var options = {
        hostname: self_host,
        port: 80,
        path: self_path+accessToken.getAccessToken(),
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            var a=JSON.parse(data);
            if(a.errcode>1)console.log('selfmenu 创建失败: ' + e.message);
            else {
                return 1;
            }
        });
    });

    req.on('error', function (e) {
        console.log('selfMenu error: ' + e.message);
    });

    req.write(selfmenu);
    req.end();
};