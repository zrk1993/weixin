/**
 * Created by RK on 2016/7/20.
 */
var config = require('../config.js');
var https = require('https');

var APPID = config.APPID;
var APPSECRET = config.APPSECRET;

var access_hostname = "https://api.weixin.qq.com";
var access_path = "/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET;

//从微信服务器上获取
function getFromWX(callback) {
    /**
     * https.get的第一个参数如果为字符串会自动url.parse()转换为options的对象形式
     */
    https.get(access_hostname+access_path, function (res) {
        res.on('data', function (data) {
            var a = JSON.parse(data);
            console.log('access_token: ' + a.access_token);
            callback(a.access_token);
        });
    }).on('error', function (e) {
        console.error(e);
    });

}

exports.getAccessToken = function (callback) {
    if (global.accessToken == null) {
        getFromWX(callback);//保存在global上，以免重复获取
    } else {
        callback(global.accessToken)
    }
};