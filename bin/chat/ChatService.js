/**
 * Created by RK on 2016/7/30.
 */
var socket_io = require('socket.io');
var wxKefu = require('../wx/wxKefu');
var Kefu=require('./Kufu');
var Customer=require('./Customer');
var HashMap =require('hashmap');

var io;
var kefus=new HashMap();
var Customers=new HashMap();

var ChatService = {
    init: init,
    sendMsg: sendMsg
};
//初始化，设置事件
function init(server) {
    io = socket_io(server, null);
    io.on('connection', function (socket) {
        socket.on('login', function (username) {
            console.log("login"+username);
            if(login(username)){
                kefus.set(username,new Kefu(username,1,socket.id));
                console.log("当前在线数："+kefus.count());
                socket.emit('login',
                    {"errcode":0,"errmsg":"ok"}
                );
            }else {
                socket.emit('login',
                    {"errcode":1,"errmsg":"err"}
                );
                console.log("login fail");
            }
        });
        socket.on('message', function (data) {            
            wxKefu.sendMsg(data);
            console.log("message"+data);
        });
    });
}
function sendMsg(msg) {
    var customer=getCustomer(msg.FromUserName);
    allotCustomer(customer);
    sendMsg2Kefu(customer.kefuname,msg);
}
//根据openid从容器里找出客户
function getCustomer(openid) {
    var customer=Customers.get(openid);
    if(customer){return customer}
    else {
        customer=new Customer(openid,0,null);//创建客户，并加入到Customers
        Customers.set(openid,Date.now(),customer);
        return getCustomer(openid);
    }
}
//将客户分发给合适的客服
function allotCustomer(customer) {
    for(var i=0,keys=kefus.keys();i<keys.length;i++){
        kefus.get(keys[i]).customers.set(customer.openid,customer);
        customer.kefuname=kefus.get(keys[i]).name;
        return kefus.get(keys[i]).customers.has(customer.openid)
    };
    console.log("在线客服："+kefus.count());
}
//根据客服名字，给他发消息
function  sendMsg2Kefu(kefuname,msg) {
    var kefu=kefus.get(kefuname);
    if(kefu){
        io.sockets.socket(kefu.socketId).emit('message', msg);
        console.log("message"+msg);
    }
}
function login(username) {
    return true;
}
module.exports = ChatService
