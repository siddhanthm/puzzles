// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema   = new mongoose.Schema({
  name: String,
  phonenumber: {type:String,default: ""},
  username: {type:String, unique:true},
  emailid: {type:String, unique:true},
  github: {type:String, default: ""},
  linkedin: {type:String, default: ""},
  skills: [String],
  education: [{name:String, startDate:Date, endDate:Date, CGPA:String, Courses:[String], major: String}],
  projects: [{description:String, name:String, github:String}],
  internship : [{description:String, company:String, startDate:Date, endDate:Date}],
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);