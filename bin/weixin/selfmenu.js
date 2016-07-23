/**
 * Created by RK on 2016/7/17.
 */
var request = require('request');
var async = require('async');

var accessToken = require('./accessToken');

var self_host = "https://api.weixin.qq.com";
var self_path = "/cgi-bin/menu/create?access_token=";

function set(selfmenu, accessToken, callback) {
    var options = {
        method: 'post',
        body: selfmenu, // Javascript object
        url: self_host+self_path+accessToken,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    request(options, function (err, res, body) {
        callback(err,body);
    });
};

exports.setSelfMenu = function (selfmenu,cb) {
    async.waterfall([
        function (callback) {
            accessToken.getAccessToken(function (accesstoken) {
                callback(null,accesstoken);
            });
        },
        function (arg1, callback) {
            set(selfmenu, arg1, function (err,body) {
                callback(err, body);
            })
        }
    ], function (err, result) {
            cb(err,result)
    });
};
exports.getSelfMenu = function (cb) {
    accessToken.getAccessToken(function (accesstoken) {
        var options = {
            method: 'get',
            url: "https://api.weixin.qq.com/cgi-bin/menu/get?access_token="+accesstoken,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
        request(options, function (err, res, body) {
            cb(err,body);
        });
    });
};
