var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var studentsRouter = require('./routes/students');
var expressValidator = require('express-validator');
var authorizeApp = require('./middleware/Authorize');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(authorizeApp.authorize);

// CORS issue Fix browser issue
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // set domain name "http://agentportal.edu" 
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); // set Origin, X-Requested-with, Content-Type, Accept, Authorization
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use('/api/v1/students', studentsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  // res.render('error');/
  res.json({
    error: {
      message:err.message
    },
    status: err.status,
    response: null
  });

});

module.exports = app;
