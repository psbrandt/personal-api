var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;

var index = require('./routes/index');
var resume = require('./routes/resume');
var workouts = require('./routes/workouts');

var app = express();
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Connect to the db
mongoClient.connect("mongodb://localhost:27017/api", function(err, database) {
  if(!err) {
      console.log("Connected!");
      db = database;
  }
});

authorise = function(db, next) {
  // console.log('authorising');
  next();
};

app.use(function(request, response, next) {
    request.database = db;
    authorise(db, next);
});

// app.use('/', index);
app.use('/resume', resume);
// app.use('/workouts', workouts);

// return 404 for unknown routes
app.use(function(req, res, next) {
  res.status(404)
    .send('Not found');
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send('2 error: ' + err.stack);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send('1 error: ' + err.message);
});


module.exports = app;