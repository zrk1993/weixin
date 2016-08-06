/**
 * Created by RK on 2016/7/30.
 */
var socket_io = require('socket.io');
var HashMap =require('hashmap');


function ChatService(server) {
    this.io = socket_io(server, null);//socket_io
    this.chatClients=new ChatClients();//在线客户端列表
}

ChatService.prototype.start=function () {
    this.io.on('connect', function (socket) {

        console.log("connect"+socket.id);

        socket.on("disconnect",function () {
            console.log("disconnect"+socket.id);
            global.ChatService.chatClients.leave(socket.name)
        });

        socket.on("join",function (msg,fn) {
            console.log("join"+msg);
            console.log(typeof  msg)
            var data = JSON.parse(msg);

            global.ChatService.chatClients.join(data.openid,new ChatClient(data.email,data.openid,socket.id));
            socket.name=data.openid;
            fn({openid:data.openid,email:data.email});
            //取出保存的消息，发送给客户端
        });

        socket.on("leave",function (data) {
            console.log("leave"+data);
            data=JSON.parse(data);
            global.ChatService.chatClients.leave(data.openid)
        });

        socket.on("newMessage",function (data) {
            console.log("message"+data);
        });
    });
};

ChatService.prototype.sendMsg=function (msg) {
    var chatClient=this.chatClients.get(msg.ToUserName,msg);
    if(chatClient){
        global.ChatService.io.to(chatClient.socketid).emit("newMessage",msg);
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
    console.log("加入："+openid);
    this.Clients.set(openid,ChatClient);
    console.log("人数："+this.Clients.count());
    this.Clients.forEach(function (value, key) {
        console.log("当前在线:"+key)
    });
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
