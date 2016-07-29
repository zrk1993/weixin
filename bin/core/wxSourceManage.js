/**
 * Created by RK on 2016/7/23.
 * temp 临时
 * forever 永久
 */
var request = require('request');//request模块https://github.com/request/request  太好用
var async = require('async');
var fs = require('fs');
var accessToken = require('./accessToken');


var wxSourceManage = {
    //temp临时
    uploadTempSourceBuff: uploadSourceBuff,
    uploadTempSourcePath: uploadSourcePath,
    uploadTempSourceUrl: uploadSourceUrl,
    getTempSourceURL: getTempSourceURL,
    getTempSourceStream:getTempSourceStream
    //forever永久

};
//根据文件路径上传文件
function uploadSourcePath(type, path, cb) {
    uploadSourceBuff(type, fs.createReadStream(path), cb)
}
//根据url路径上传文件
function uploadSourceUrl(type, url, cb) {
    var buff = request.get(url);
    uploadSourceUrl(type, buff, cb)
}
//根据Buff路径上传文件
function uploadSourceBuff(type, buff, cb) {
    accessToken.getAccessToken(function (accessToken) {
        var api = "https://api.weixin.qq.com/cgi-bin/media/upload?access_token=" + accessToken + "&type=" + type;
        var formData = {
            media: buff
        };
        request.post({url: api, formData: formData}, function optionalCallback(err, httpResponse, body) {
            cb(err, body)
        });
    })

}
//获取临时素材 返回URL
function getTempSourceURL(mediaId, cb) {
    accessToken.getAccessToken(function (accessToken) {
        var api = "https://api.weixin.qq.com/cgi-bin/media/get?access_token=" + accessToken + "&media_id=" + mediaId;
        cb(api);
    });
}
//获取临时素材 返回一个可读流
function getTempSourceStream(mediaId, cb) {
     getTempSourceURL(mediaId,function (url) {
         var stream=request(url);
         cb(stream);
     });
}

// request(option)
//     .on('response', function(response) {
//         console.log(0)
//     })
//     .on('data', function(data) {
//         console.log(1)
//     }).on('end', function() {
//         console.log(2)
//     })

module.exports = wxSourceManage;