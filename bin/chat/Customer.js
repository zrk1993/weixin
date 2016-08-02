/**
 * Created by RK on 2016/8/1.
 */
//客户 model
function Customer (openid,time,kefuname) {
    this.openid=openid;
    this.lastTime=time;//最近一次发送消息的时间
    this.kefuname=kefuname;//客服
}
module.exports=Customer;