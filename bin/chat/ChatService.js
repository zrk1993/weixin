/**
 * Created by RK on 2016/7/30.
 */
var socket_io = require('socket.io');
var wxKefu = require('../wx/wxKefu');
var Kefu=require('./Kufu');
var Customer=require('./Customer');
var Map =require('../util/Map');

var io;
var sockets = [];
var kefus=new Map();
var ChatService = {
    init: init,
    sendMsg: sendMsg
};
//初始化，设置事件
function init(server) {
    io = socket_io(server, null);
    io.on('connection', function (socket) {
        socket.on('login', function (username,password) {
            console.log("login"+username)
            if(login(username,password)){
                kefus.put(username,new Kefu(username,1,socket.id));
                socket.emit('login',
                    {
                        state: 1
                    }
                );
            }else {
                socket.emit('login',
                    {
                        state: 0
                    }
                );
            }
        });
        socket.on('message', function (data) {
            wxKefu.sendMsg(data);
            console.log("message"+data)
        });
    });
}
function sendMsg(msg) {
    kefus.each(function (username,Kefu) {
        var Customer=Kefu.customers.get(msg.openid);//从客服服务对象里根据openid,获取客户
        if(Customer){
            io.sockets.socket(Kefu.socketId).emit('message', msg);
            console.log("sendMsg"+msg)
        }else {
            Kefu.customers.put(msg.openid,new Customer(msg.openid,0));
            sendMsg(msg);
        }
    });
}
function login(username,password) {
    return true;
}
module.exports = ChatService
