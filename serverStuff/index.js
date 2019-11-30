'use strict';

var express = require('express');
var firebase = require('firebase-admin');
var cookieParser = require('cookie-parser')
var Promise = require('promise');
var app = express();
var bodyParser = require('body-parser');

var serviceAccount = require('./cmsc436-geek-out-firebase-adminsdk-26i1b-3a2532190a.json');

var users = Array.new();

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: 'https://cmsc436-geek-out.firebaseio.com'
});

function getQuestion(category){
    var rootRef = firebase.database().ref()
    rootRef.once('value', function(dataSnapshot) {
        
        console.log(dataSnapshot);
    })
}

function selectFirstUser(){
    var numUsers = users.length;
    var firstUser = Math.floor(Math.random()*numUsers);
    console.log(`${firstUser} was selected to go first`);
}

function sendInfo(user){
    //Need websocket connection to do this
    //Basic structure is:
    // Send question
    // Send bid
    // Display answers
}

function updateUsers(){
    users.forEach(function(user){
        sendInfo(user);
    })
}

function checkIfSignedIn(url) {
  return function(req, res, next) {
    if (req.url == url) {
      var sessionCookie = req.cookies.session || '';
      // User is logged in. Can get questions and submit answers
      admin.auth().verifySessionCookie(sessionCookie).then(function(decodedClaims) {
        return true;
      }).catch(function(error) {
        next();
        return false;
      });
    } else {
      next();
      return false;
    }
  }
}

app.use(bodyParser.json());
app.use(cookieParser());
app.use(checkIfSignedIn('/',));

/** Session login endpoint. */
app.post('/sessionLogin', function (req, res) {
    // Get ID token and CSRF token.
    var idToken = req.body.idToken.toString();
    var csrfToken = req.body.csrfToken.toString();
    
    // Guard against CSRF attacks.
    if (!req.cookies || csrfToken !== req.cookies.csrfToken) {
      res.status(401).send('UNAUTHORIZED REQUEST!');
      return;
    }
    // Set session expiration to 5 days.
    var expiresIn = 60 * 60 * 24 * 5 * 1000;
    // Create the session cookie. This will also verify the ID token in the process.
    // The session cookie will have the same claims as the ID token.
    // We could also choose to enforce that the ID token auth_time is recent.
    admin.auth().verifyIdToken(idToken).then(function(decodedClaims) {
      // In this case, we are enforcing that the user signed in in the last 5 minutes.
      if (new Date().getTime() / 1000 - decodedClaims.auth_time < 5 * 60) {
        return admin.auth().createSessionCookie(idToken, {expiresIn: expiresIn});
      }
      throw new Error('UNAUTHORIZED REQUEST!');
    })
    .then(function(sessionCookie) {
      // Note httpOnly cookie will not be accessible from javascript.
      // secure flag should be set to true in production.
      var options = {maxAge: expiresIn, httpOnly: true, secure: false /** to test in localhost */};
      res.cookie('session', sessionCookie, options);
      res.end(JSON.stringify({status: 'success'}));
    })
    .catch(function(error) {
      res.status(401).send('UNAUTHORIZED REQUEST!');
    });
  });
  
  /** User signout endpoint. */
  app.get('/logout', function (req, res) {
    // Clear cookie.
    var sessionCookie = req.cookies.session || '';
    res.clearCookie('session');
    // Revoke session too. Note this will revoke all user sessions.
    if (sessionCookie) {
      admin.auth().verifySessionCookie(sessionCookie, true).then(function(decodedClaims) {
        return admin.auth().revokeRefreshTokens(decodedClaims.sub);
      })
      .then(function() {
        // Success. Nothing to be done as user cookie is already removed
      })
      .catch(function() {
        // Shouldn't arrive here unless horrible failure
      });
    } else {
      // No cookie available. Nothing needed here
    }
  });
  
  /** User delete endpoint. */
  app.get('/delete', function (req, res) {
    var sessionCookie = req.cookies.session || '';
    res.clearCookie('session');
    if (sessionCookie) {
      // Verify user and then delete the user.
      admin.auth().verifySessionCookie(sessionCookie, true).then(function(decodedClaims) {
        return admin.auth().deleteUser(decodedClaims.sub);
      })
      .then(function() {
        // Success. Nothing to be done as user cookie is already removed
      })
      .catch(function() {
        // Shouldn't arrive here unless horrible failure
      });
    } else {
      // No cookie available. Nothing needed here
    }
  });

