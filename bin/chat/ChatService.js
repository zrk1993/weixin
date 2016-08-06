/**
 * Created by RK on 2016/7/30.
 */
var socket_io = require('socket.io');
var HashMap =require('hashmap');
var ChatClient =require('./ChatClient');

function ChatService(server) {
    this.io = socket_io(server, null);
    this.chatClients=new ChatClients();
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
