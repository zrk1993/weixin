var express = require('express');
var router = express.Router();

router.use(express.static(path.join(__dirname, 'admin')));

/* GET home page. */
router.get('/', function(req, res, next) {
  var co;
  for(var key in  req.cookies){
    co+="cookie名:"+key;
    co+="cookie值:"+req.cookies[key]+"<br />";
  }
  res.render('test', { title: 'Express' ,cookie:co});
});
module.exports = router;
