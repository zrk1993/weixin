/**
 * Created by RK on 2016/7/30.
 */
var socket_io = require('socket.io');

var io;

var ChatService = {
    init: init
};
//初始化，设置事件
function init(server) {
    io = socket_io(server, null);
    io.on('connection', function (socket) {

        console.log("connection"+socket.id);

        socket.on("disconnect",function () {
            console.log("disconnect"+socket.id);
        });

        socket.on("message",function (data) {
            console.log("message"+data);
        });
    });

}


module.exports = ChatService;
