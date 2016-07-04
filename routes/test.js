var express = require('express');
var router = express.Router();
var select = require('xpath.js');
var dom = require('xmldom').DOMParser;

/* GET home page. */

router.get('/', function(req, res, next) {


    res.send(new Data())


});
function messageHandler(result) {
    return result;
}
module.exports = router;
