/**
 * Created by RK on 2016/7/20.
 */
var config=require('../config.js');
var http = require('http');

var APPID=config.APPID;
var APPSECRET=config.APPSECRET;

var access_hostname="https://api.weixin.qq.com";
var access_path="/cgi-bin/token?grant_type=client_credential&appid="+APPID+"&secret="+APPSECRET;

//从微信服务器上获取
function getFromWX() {
    var options = {
        hostname: access_hostname,
        port: 80,
        path: access_path,
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            var a=JSON.parse(data);
            return a.access_token;
        });
    });

    req.on('error', function (e) {
        console.log('access_token 获取失败: ' + e.message);
    });
    req.end();
}

exports.getAccessToken=function () {
    if(global.accessToken==null){
        global.accessToken=getFromWX;//保存在global上，以免重复获取
    }
    return global.accessToken;
};