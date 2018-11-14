var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');


app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('*', function (req, res) {
  console.log('I received a GET request');
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// app.post('/queryUser', function(req, res) {
// });

// app.post('/authenticate', function(req, res) {
// });

// app.post('/logout', function(req, res) {
//   req.session.isAuthenticated = false;
//   res.json({isAuthenticated :req.session.isAuthenticated, loggedInUsername :req.session.loggedInUserGivenName});
// });

// app.post('/isAuthenticated', function(req, res) {
//   console.log(req.session);
//   res.json({isAuthenticated: req.session.isAuthenticated});
// })

app.listen(3000);
console.log("Server running on port 3000");