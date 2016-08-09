/**
 * Created by RK on 2016/8/7.
 */
var mongoose =require('mongoose');
var Schema=mongoose.Schema;

var user_account=new Schema({
    email:String,       //注册邮箱
    password:String,    //密码
    signUpTime:String,  //注册时间呢
    name:String,        //姓名
    tel:String          //电话
});

module.exports=user_account;