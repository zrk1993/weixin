/**
 * Created by RK on 2016/7/30.
 */
var socket_io = require('socket.io');
var HashMap =require('hashmap');


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

ChatService.prototype.sendMsg=function (msg) {
    var chatClient=this.chatClients.get(msg.ToUserName,msg);
    if(client){
        this.io.to(chatClient.socketid).emit("message",msg);
        console.log("消息发送出："+JSON.stringify(msg))
    }else {
        //将消息保存，等下次登录是在发送
        this.saveMsg(msg);
    }
};
ChatService.prototype.saveMsg=function (msg) {
    console.log("消息保存起来了："+JSON.stringify(msg))
};

//在线客户端列表
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

//客户端
function ChatClient(accountname,openid,socketid) {
    this.accountname=accountname;
    this.openid=openid;
    this.socketid=socketid;
}

module.exports = ChatService;
