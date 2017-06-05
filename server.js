/*
 *Name: Owen Loughran
 *Assignment: 5
 */
var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var data = require('./twitData.json');
var app = express();
var port = 3000;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res, next) {
   console.log("== url params for rquest:", req.params);
   if (data) {
      var inputs = {
         twits: data,
         show: 1
      }
      res.render('twitPage',inputs);
   }
   else {
      next();
   }
});

app.get('/twits/:index', function (req, res, next) {
   console.log("== url params for rquest:", req.params);
   var index = req.params.index;
   if (index < data.length && index >= 0) {
      var inputs = {
         twits: [data[index]],
         show: 0
      }
      res.render('twitPage',inputs);
   }
   else {
      res.status(404);
      res.render('404Page');
   }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', function (req, res, next) {
   console.log("== url params for rquest:", req.params);
   res.render('404Page');
   res.status(404);
});

app.listen(port, function() {
   console.log("== Server is running on port: ", port);
});
