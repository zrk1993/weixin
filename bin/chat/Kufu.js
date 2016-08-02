/**
 * Created by RK on 2016/8/1.
 */
var HashMap =require('hashmap');
//客服model
function Kefu (name,state,socketId) {
    this.name=name;
    this.state=state;
    this.socketId=socketId;
    this.customers=new HashMap();//服务客户的容器
}
module.exports=Kefu;