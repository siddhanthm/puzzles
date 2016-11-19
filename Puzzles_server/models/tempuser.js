// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var TempUserSchema   = new mongoose.Schema({
  emailid: {type:String, unique:true},
  username: {type:String, unique:true},
  password: {type:String},
  data: {type:String}
});

// Export the Mongoose model
module.exports = mongoose.model('TempUser', TempUserSchema);