var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var port = 8000;
console.log("Express server running on " + port);
app.listen(port);


// var express = require('express');
// var app = express();
// var passport = require('passport');
// var expressSession = require('express-session');
// app.use(expressSession({secret: 'mySecretKey'}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static(__dirname + '/public'));
// var port = process.env.PORT || 3000;
// console.log("Express server running on " + port);
// app.listen(process.env.PORT || port);