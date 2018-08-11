var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var ActiveDirectory = require('activedirectory');
var path = require('path');
var soap = require('soap');
var multer = require('multer');
var _ = require('underscore');
var fs = require('fs');
var upload = multer({dest: path.join(__dirname,'../uploads')});
var docxConverter = require('docx-pdf');
var usersarray;
var replaceExt = require('replace-ext');
var ldap = require('ldapjs');


app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());

app.get('*', function (req, res) {
  console.log('I received a GET request');
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.post('/queryUser', function(req, res) {
  var config = {
    url: 'ldap://ldap.calpolyieee.com:389',
    baseDN: 'DC=calpolyieee,DC=com',
    username: 'CN=admin,DC=calpolyieee,DC=com',
    password: 'p@ssw0rd1999'
  }
  var ad = new ActiveDirectory(config);
  var users;
  var opts = {includeMembership: ['all'],
  attributes: ['cn', 'displayName', 'ieeeExpiration', 'ieeeMemberNumber', 'mail', 'member', 'o', 'sn', 'uid', 'description'],
  baseDn: 'dc=members,dc=calpolyieee,dc=com',
  filter: 'cn=*'};
  ad.find(opts, function(err, results) {
    var users=[];
    _.each(results.other, function(other) {
      users.push(other);
    });
    res.json({users: users});
  });
});
  // var opts = {includeMembership: ['all'],
  // attributes: ['cn', 'displayName', 'ieeeExpiration', 'ieeeMemberNumber', 'mail', 'member', 'o', 'sn', 'uid', 'description', 'userPassword'],
  // filter: '(&(objectClass=ieeeUser)(member=cn=officers,dc=calpolyieee,dc=com))',
  // baseDn: 'dc=members,dc=calpolyieee,dc=com'};
  // var ad = new ActiveDirectory(config);
  // var username = 'cn=dgaiero,dc=members,dc=calpolyieee,dc=com';
  // var password = 'sky1.1';
 
// ad.authenticate(username, password, function(err, auth) {
//   if (err) {
//     console.log('ERROR: '+JSON.stringify(err));
//     return;
//   }
  
//   if (auth) {
//     console.log('Authenticated!');
//   }
//   else {
//     console.log('Authentication failed!');
//   }
// });

app.listen(3000);
console.log("Server running on port 3000");