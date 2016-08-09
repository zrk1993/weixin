/**
 * Created by RK on 2016/8/6.
 */

var mongoose =require('mongoose');
var Schema=mongoose.Schema;

var wx_authorizer_info=new Schema({
    authorizer_info: {
        nick_name: String,                        //授权方昵称
        head_img: String,                         //授权方头像
        service_type_info: { id: Number },      //授权方公众号类型
        verify_type_info: { id: Number },       //授权方认证类型
        user_name:String,                        //授权方公众号的原始ID
        business_info: {                        //功能的开通状况
            open_store: Number
            , open_scan: Number, open_pay: Number
            , open_card: Number, open_shake: Number
        },
        alias:String             //授权方公众号所设置的微信号，可能为空
    },
    qrcode_url:String,         //二维码图片的URL
    authorization_info: {    //授权信息
        appid: String,        //授权方appid
        func_info: [
            { funcscope_category: { id: Number } }      //公众号授权给开发者的权限集列表，ID为1到15
        ]
    }
});

module.exports=wx_authorizer_info;