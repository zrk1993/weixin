/**
 * Created by RK on 2016/7/30.
 */
var socket_io = require('socket.io');
var Kefu=require('./Kufu');
var Customer=require('./Customer');
var HashMap =require('hashmap');
var accessToken=require('../wx/accessToken');

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
            console.log("message"+data);
            sendMsg2Wx(data);
        });
    });
}
function sendMsg(msg) {
    console.log("message"+msg);
    var customer=getCustomer(msg.FromUserName);
    allotCustomer(customer);
    sendMsg2Kefu(customer.kefuname,"message",msg);
}
//根据openid从容器里找出客户
function getCustomer(openid) {
    var customer=Customers.get(openid);
    if(customer){return customer}
    else {
        customer=new Customer(openid,Date.now(),null);//创建客户，并加入到Customers
        Customers.set(openid,customer);
        return getCustomer(openid);
    }
}
//将客户，根据规则分发给合适的客服
function allotCustomer(customer) {
    for(var i=0,keys=kefus.keys();i<keys.length;i++){
        kefus.get(keys[i]).customers.set(customer.openid,customer);
        customer.kefuname=kefus.get(keys[i]).name;
        sendMsg2Kefu(kefus.get(keys[i]).name,"joinCustomer",customer);//通知客服，有客户加入
        return kefus.get(keys[i]).customers.has(customer.openid)
    };
    if(kefus.count()){
        allotCustomer2kefu(customer,kefus.get(kefus.keys()[0]).name)
    }else {
        console.log("在线客服："+kefus.count()); 
    }    
}
//根据客服名，将客户分发给客服
function allotCustomer2kefu(customer,kefuname) {    
        kefus.get(kefuname).customers.set(customer.openid,customer);
        customer.kefuname=kefus.get(keys[i]).name;
        sendMsg2Kefu(kefus.get(keys[i]).name,"joinCustomer",customer);//通知客服，有客户加入
}
//根据客服名字，给他发消息
function  sendMsg2Kefu(kefuname,enent,msg) {
    var kefu=kefus.get(kefuname);
    if(kefu){
        io.to(kefu.socketId).emit(enent, msg);
        console.log("message"+msg);
    }else {
        console.log("没有客服");
    }
}
//发信息get微信
function  sendMsg2Wx(msg) {
    var api="https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=%s";
    accessToken.getAccessToken(function (AccessToken) {
        console.log("sendMsg"+msg);
        request.post({url: api, body: msg}, function optionalCallback(err, httpResponse, body) {
            console.log(body);
        });
    });
}
function login(username) {
    return true;
}
module.exports = ChatService
