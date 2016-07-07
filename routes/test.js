var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

/* GET home page. */

router.get('/', function(req, res, next) {


    var xml = "<rootq</root>"
    parseString(xml, function (err, result) {
        if(err){
            res.send("err");
        }else {
            res.send("ok");
        }
    });

});

module.exports = router;
