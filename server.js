var dbconfig = require("./config/database");
var mysql = require("mysql");
var connection = mysql.createConnection(dbconfig.connection);
var express = require("express");
var session = require("express-session");
var cookieParser = require("cookie-parser");
//var bodyParser = require("body-parser");
var morgan = require("morgan");
var app = express();
var port = process.env.PORT || 3000;
var passport = require("passport");
var flash = require("connect-flash");
//var { check, validationResult } = require("express-validator");

require("./config/passport.js")(passport);

app.use(morgan("dev")); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());



app.use(express.static(__dirname + "/views"));

//app.use({ check, validationResult });

app.set("view engine", "ejs"); // set up ejs for templating

// required for passport
app.use(
  session({
    secret: "devQuackisrunning",
    resave: true,
    saveUninitialized: true
  })
); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require("./app/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log("devQuackisrunning  localhost: " + port);
