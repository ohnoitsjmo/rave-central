var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var ActiveDirectory = require('activedirectory');
var path = require('path');
var soap = require('soap');
var multer = require('multer');
var fs = require('fs');
var upload = multer({dest: path.join(__dirname,'../uploads')});
var docxConverter = require('docx-pdf');
var usersarray;
var replaceExt = require('replace-ext');

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());

app.get('*', function (req, res) {
  console.log('I received a GET request');
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(3000);
console.log("Server running on port 3000");