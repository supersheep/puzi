var express = require('express');
var path = require('path');
var app = express();
var cortex_package = require('./cortex.json');
var routes = require('./routes');

app.set('view engine','jade');
app.set('views', path.join(__dirname, 'views'));

app.use(function(req,res,next){
  res.locals.package_version = cortex_package.version;
  next();
});

app.use(express.static( path.join(__dirname, 'neurons') ));
app.use(express.static( path.join(__dirname, 'public') ));
app.use(routes.puzi);

app.listen(3000, function(){
  console.log("server started at 3000");
});
