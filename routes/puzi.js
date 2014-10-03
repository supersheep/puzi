var express = require('express');

var router = express.Router();
router.get('/', function(req, res){
  res.render('puzi',{
    id:"name"
  });
});

module.exports = router;