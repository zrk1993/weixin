/**
 * Created by RK on 2016/7/30.
 */
var socket_io = require('socket.io');
var HashMap =require('hashmap');
var ChatClient =require('./ChatClient');

function ChatService(server) {
    this.io = socket_io(server, null);//socket_io
    this.chatClients=new ChatClients();//在线列表
}

ChatService.prototype.start=function () {
    this.io.on('connect', function (socket) {
        console.log("connect"+socket.id);

        socket.on("disconnect",function () {
            console.log("disconnect"+socket.id);
        });

        socket.on("join",function (data) {
            console.log("message"+data);
            this.chatClients.join("a",new ChatClient('18094159838@163.com','a',socket.id))
        });

        socket.on("leave",function (data) {
            console.log("message"+data);
            this.chatClients.leave('a')
        });

        socket.on("newMessage",function (data) {
            console.log("message"+data);
        });
    });
};

ChatService.prototype.sendMsg=function (openid, msg) {
    var client=this.chatClients.get(openid);
    if(client){
        client.send(msg);
    }else {
        //将消息保存，等下次登录是在发送
        this.saveMsg(openid,msg);
    }
};
ChatService.prototype.saveMsg=function (openid,msg) {
    console.log("消息保存起来了："+JSON.stringify(msg))
};

//在线列表
function ChatClients() {
    this.Clients=new HashMap();
}
ChatClients.prototype.join=function (openid,ChatClient) {
    this.Clients.set(openid,ChatClient);
};
ChatClients.prototype.leave=function (openid) {
    this.Clients.remove(openid);
};
ChatClients.prototype.get=function (openid) {
    this.Clients.get(openid);
};

module.exports = ChatService;
