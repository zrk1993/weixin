/**
 * Created by RK on 2016/8/6.
 */
function ChatClient(accountname,openid,socketid) {
    this.accountname=accountname;
    this.openid=openid;
    this.socketid=socketid;
}

ChatClient.prototype.send=function (socketIo,msg) {
    socketIo.to(this.socketid).emit("message",msg);
    console.log("消息发送出去了：："+JSON.stringify(msg))
};

module.exports=ChatClient;