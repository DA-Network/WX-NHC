/* 
* app.js
* entry point for app
*
* WRITTEN FOR DIGITALADDICTION 
* BY ZYTHER 
* MAJOR REWRITE 03/16/17
*/


// includes

var express     = require("express"),
    path        = require("path"),
    favicon     = require("serve-favicon"),
    logger      = require("morgan"),
    cookieP     = require("cookie-parser"),
    bodyP       = require("body-parser");
    
  
// app-root-dir for static paths relative to the app's root directory
require("app-root-dir").set(__dirname);


//start the webserver
var app = express();

app.use(logger('dev'));
app.use(bodyP.json());
app.use(bodyP.urlencoded({ extended: false }));
app.use(cookieP());
app.use(express.static(path.join(__dirname, 'public')));

  
//startswith capabilities   
if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
  };
}


// connect to IRC
var ircClient = require("./js/irc/wrapper");

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "ejs");




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;