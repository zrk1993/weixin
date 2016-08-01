/**
 * Created by RK on 2016/8/1.
 */
var Map =require('../util/Map');
//客服model
function Kefu (name,state,socketId) {
    this.name=name;
    this.state=state;
    this.socketId=socketId;
    this.customers=new Map();//服务客户的容器
}
module.exports=Kefu;