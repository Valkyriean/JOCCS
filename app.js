/* Cheat sheet

docker build -t joccs .
docker run -p 3000:3000 joccs
docker container ls
docker container stop
docker tag joccs valkyriean/joccs:latest
docker push valkyriean/joccs:latest
docker run -p 3000:3000 valkyriean/joccs:latest

docker container rm $(docker container ls -a -q)
docker image rm $(docker image ls -a -q)

docker image rm <image id>
docker login

*/
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// // var indexRouter = require('./routes/index');
// // var usersRouter = require('./routes/users');
// var apiRouter = require('./routes/api');
//
// var app = express();
// app.listen(3000);
//
// // view engine setup
// //app.set('views', path.join(__dirname, 'views'));
// //app.set('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// // app.use('/', indexRouter);
// // app.use('/users', usersRouter);
// app.use('/api', apiRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// console.log("Yes, I am running");
//
// module.exports = app;

var express = require('express');
var bodyParser = require('body-parser');
var api = require('./routes/api');

var app = express();

app.listen(3000);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use('/api',api);

console.log("Initialized")
