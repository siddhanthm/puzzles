//File build on top of the starter code for webdev-project for CS 498 class taken in SP 15

// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var User = require('./models/user');
var TempUser = require('./models/tempuser');
// For passport protection
var bcrypt = require('bcrypt');
const saltRounds = 10;
var bodyParser = require('body-parser');
var router = express.Router();
//replace this with your Mongolab URL
mongoose.connect('mongodb://sid:plmokn@ds055575.mlab.com:55575/puzzles');
// mongoose.connect('mongodb://final:final@ds011291.mlab.com:11291/flintstonedata');

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// app.use(bodyParser.json());

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", 'GET, PUT, POST, DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
   if('OPTIONS' == req.method)
    res.send(200);
  else
    next();
};
app.use(allowCrossDomain);


// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  limit: '1mb',
  extended: true
}));

// All our routes will start with /api
app.use('/api', router);

//Default route here
var homeRoute = router.route('/');
homeRoute.get(function(req, res) {
  res.json({ message: 'Use /users to access data', data:[]});
});


var userRoute = router.route('/users');

userRoute.get(function(req, res){
  var where = eval("("+req.query.where+")");
  var select = eval("("+req.query.select+")");
  TempUser.find(where).select(select).exec(function(err, users){
      if(err)
        res.status(500).send(err);
      else
        res.status(200).send({message:'OK', data:users});
  });
});

userRoute.post(function(req, res){
  if(!req.body.emailid || !req.body.username || !req.body.data || !req.body.password)
    res.status(500).send({message: 'Information missing'});
  else{
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      TempUser.create({
        emailid: req.body.emailid,
        username: req.body.username,
        data: req.body.data,
        password: hash
      }, function(err, users){
        if(err){
          res.status(500).send(err);
        }else{
          res.status(201).json({message:'User Added!', data:users});
        }
        });
    });
  }
});


var userRouteId = router.route('/users/:id');

userRouteId.get(function(req, res){
  TempUser.findById(req.params.id, function(err, user){
    if(err)
      res.status(500).send(err);
    else if(user == undefined){
      res.status(400).send({message:"User does not exist", data:[]});
    }else{
      res.status(200).send({message:"Ok", data : user});
    }
  });
});

userRouteId.delete(function(req,res){
  TempUser.findById(req.params.id, function(err, users){
    if(err)
      res.status(500).send(err);
    else if(users == undefined)
      res.status(404).send({message:'User Does Not Exist'});
    else{
      TempUser.findByIdAndRemove(req.params.id, function(err,user){
        if(err)
          res.status(500).send(err);
        res.json({message:'User Deleted!', data:[]});
      });
    }
  });
});

var passwordRoute = router.route('/password/');

passwordRoute.post(function(req,res){
  TempUser.findById(req.body.id,function(err,user){
    if(err)
      res.status(500).send(err);
    else if(user == undefined)
      res.status(404).send({message:'User Does Not Exist', enter:false});
    else{
      bcrypt.compare(req.body.password, user.password, function(err, res2) {
          res.send({enter: res2});
      });
    }
  });
});

// Start the server
app.listen(port);
console.log('Server running on port ' + port);