/**
 * Created by RK on 2016/8/1.
 */
//模拟一个Map对象
function Map(){

    //声明一个容器
    var container={};

    //定义一个put方法,向容器中存值
    this.put=function(key,value){
        container[key]=value;
    }

    //通过key获取value
    this.get=function(key){
        if(container[key] || container[key]===0 || container[key]===false){
            return container[key]
        }else{
            return null;
        }
    }

    //获取map中存入键值对的个数
    this.size=function(){
        var count=0;
        //遍历对象属性
        for(var attr in container){
            count++;
        }
        return count;
    }

    //遍历map并传入一个回调函数,该函数有2个参数，一个接收key，一个接收value
    this.each=function(callback){
        for(var attr in container){
            callback(attr,container[attr]);
        }
    }

    //从map中删除数据
    this.remove=function(key){
        delete container[key];
    }
}
module.exports=Map;