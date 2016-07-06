var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

/* GET home page. */

router.get('/', function(req, res, next) {


    var xml = "<root>Hello xml2js!</root>"
    parseString(xml, function (err, result) {
        res.send("2");
    });

});

module.exports = router;
