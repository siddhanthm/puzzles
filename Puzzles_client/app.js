var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var port = 8000;
console.log("Express server running on " + port);
app.listen(port);