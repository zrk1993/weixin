var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

/* GET home page. */
router.get('/', function(req, res, next) {
    var xml = "<root>Hello xml2js!</root>";
    parseString(xml, function (err, result) {
        var s=messageHandler(result);
        res.send(s);
    });
});
router.post('/', function(req, res, next) {
    var xml = "<root>Hello xml2js!</root>";
    parseString(xml, function (err, result) {
        var s=messageHandler(result);
        res.send(s);
    });
});
function messageHandler(result) {
    return result;
}
module.exports = router;
