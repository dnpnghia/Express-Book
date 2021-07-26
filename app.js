var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const serverless = require('serverless-http');
// dotenv
require('dotenv').config()

// //path database
// mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology: true });



const uri =
"mongodb+srv://dnpnghia:"  + process.env.MONGO_PASSWORD + "@cluster0.42hhd.mongodb.net/Express-Book?retryWrites=true&w=majority"

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,   })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

var port = process.env.PORT;

var app = express();
const router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

var usersMiddleware = require("./middlewares/user.middleware");
var sessionsMiddleware = require("./middlewares/sessions.middleware");
app.use(sessionsMiddleware.requireSession, sessionsMiddleware.count);


var authRoute = require("./routes/auth.route");
var userRoute = require("./routes/user.route");
var bookRoute = require("./routes/book.route");
var shopRoute = require("./routes/shop.route");
var cartRoute = require("./routes/cart.route");
var transactionRoute = require("./routes/transaction.route");

// basic-routing
app.get("/", (request, response) => {
  response.render("index");
});


app.use("/auth", authRoute);
app.use("/user", usersMiddleware.requireAuth, userRoute);
app.use("/books", bookRoute);
app.use("/shops", usersMiddleware.requireAuth, shopRoute);
app.use("/cart", cartRoute);
app.use("/transactions", usersMiddleware.requireAuth, transactionRoute);


router.get('/', (req, res) => {
  response.render("index");
});
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

app.listen(port,function(){
  console.log("Server listening connect port " + port)
})

app.use('/.netlify/functions/server', router); 
module.exports = app;
module.exports.handler = serverless(app);