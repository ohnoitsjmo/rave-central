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
  filter: '(\|(member=cn=activeMembers,dc=calpolyieee,dc=com)(member=cn=inactiveMembers,dc=calpolyieee,dc=com)(member=cn=arrearsMembers,dc=calpolyieee,dc=com))'};
  ad.find(opts, function(err, results) {
    var users=[];
    _.each(results.other, function(other) {
      users.push(other);
    });
    res.json({users: users});
  });
});

app.post('/authenticate', function(req, res) {
  var config = {
    url: 'ldap://ldap.calpolyieee.com:389',
    baseDN: 'DC=calpolyieee,DC=com',
    username: 'CN=admin,DC=calpolyieee,DC=com',
    password: 'p@ssw0rd1999'
  }
  var opts = {includeMembership: ['all'],
  attributes: ['cn', 'displayName', 'ieeeExpiration', 'ieeeMemberNumber', 'mail', 'member', 'o', 'sn', 'uid', 'description', 'userPassword'],
  filter: '(&(objectClass=ieeeUser)(member=cn=officers,dc=calpolyieee,dc=com))',
  baseDn: 'dc=members,dc=calpolyieee,dc=com'};
  var ad = new ActiveDirectory(config);
  var username = 'ieeeMemberNumber=' + req.body['username'] + ',dc=members,dc=calpolyieee,dc=com';
  var password = req.body['password'];
  
  ad.authenticate(username, password, function(err, auth) {
    if (auth) {
      console.log("authenticated");
      res.json({isAuthenticated: true})
    }
    else {
      console.log("invalid");
      res.json({isAuthenticated: false})
    }
  });
});

app.post('/getUserInfo', function (req, res) {
  return res.json({isAuthenticated : req.session.isAuthenticated, username : req.session.username, 
    email : req.session.email, givenName : req.session.loggedInUserGivenName, displayName : req.session.displayName });
});

app.post('/logout', function (req, res) {
  //getApprovers("RevisedDeviation","DEV-003952M","CCB");
  req.session.isAuthenticated = false;
  res.json({isAuthenticated :req.session.isAuthenticated, loggedInUsername :req.session.loggedInUserGivenName});
});

app.listen(3000);
console.log("Server running on port 3000");