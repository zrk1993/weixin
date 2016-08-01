/**
 * Created by RK on 2016/8/1.
 */
//客户 model
function Customer (openid,time) {
    this.openid=openid;
    this.lastTime=time;//最近一次发送消息的时间
}
module.exports=Customer;