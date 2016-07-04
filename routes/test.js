var express = require('express');
var router = express.Router();
var select = require('xpath.js');
var dom = require('xmldom').DOMParser;

/* GET home page. */

router.get('/', function(req, res, next) {


    var xml = "<book><title>Harry Potter</title></book>"
    var doc = new dom().parseFromString(xml)
    var nodes = select(doc, "//title")
    res.send(nodes[0].localName + ": " + nodes[0].firstChild.data)
    res.send("node: " + nodes[0].toString())

});
function messageHandler(result) {
    return result;
}
module.exports = router;
