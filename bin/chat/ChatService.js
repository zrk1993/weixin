/**
 * Created by RK on 2016/7/30.
 */
var socket_io = require('socket.io');
var wxKefu = require('../wx/wxKefu');

var io;
var sockets = [];
var ChatService = {
    init: init,
    sendMsg: sendMsg
}
//初始化，设置事件
function init(server) {
    io = socket_io(server, null);
    io.on('connection', function (socket) {
        socket.emit('connect', "接入成功");
        console.log("接入成功");
        socket.on('add user', function (username) {
            console.log(username);
            socket.emit('login', {
                numUsers: "name:" + username
            })
        });

        socket.on('wx', function (data) {
            console.log(data);
            wxKefu.sendMsg(data)
        });
    });
}
function sendMsg(msg) {
    io.sockets.emit('wx', msg.Content);
    console.log("sendMsg"+msg.Content);
}


module.exports = ChatService
