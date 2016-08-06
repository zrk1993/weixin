/**
 * Created by RK on 2016/8/6.
 */
function ChatClient(accountname,openid,socketid) {
    this.accountname=accountname;
    this.openid=openid;
    this.socketid=socketid;
}

ChatClient.prototype.sendMag=function (socketIo,msg) {
    socketIo.to(this.socketid).emit("message",msg)
};

module.exports=ChatClient;