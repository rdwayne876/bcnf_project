var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts')
var session = require('express-session')
var flash = require('express-flash')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')
var studentRouter = require('./routes/student')
var courseRouter =  require('./routes/course')
var teacherRouter = require('./routes/teacher')

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', './layout/layout')
app.set('layout index', false)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts)
app.use(session({
  secret: 'ecQJ099i5JLW15yU4lnktvrBjiPUuKeJ',
  saveUninitialized: true,
  resave: false,
  cookie: { maxAge: 900000}
}))
app.use(flash())


app.use('/', indexRouter);
app.use('/auth', authRouter)
app.use('/users', usersRouter);
app.use('/students', studentRouter)
app.use('/courses', courseRouter)
app.use('/teachers', teacherRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
