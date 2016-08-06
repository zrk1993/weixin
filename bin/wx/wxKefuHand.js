/**
 * Created by RK on 2016/8/6.
 */
//返回值 true:拦截并处理该消息；false：不处理消息
function wxKefuHand(msg,res) {
    res.end("");
    global.ChatService.sendMsg(msg);
}
module.exports=wxKefuHand;