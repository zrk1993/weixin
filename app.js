var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser'); 
var bodyParser = require('body-parser');

var defaul = require('./routes/default');
var weixin = require('./routes/weixin');//微信消息接收
var wxSelfmenu = require('./routes/wxSelfmenu');//微信自定义菜单
var wxSource = require('./routes/wxSource');//微信素材管理

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.use(session({resave: false,saveUninitialized: true, secret: 'mysession',cookie: {maxAge: 60 * 1000}}));

app.use('/', defaul);
app.use('/weixin', weixin);
app.use('/wxSource', wxSource);
app.use('/wxSelfmenu', wxSelfmenu);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
