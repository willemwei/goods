const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let userSchema = new Schema({
  userName: String,
  userPwd: String
});

module.exports = Mongoose.model('User', userSchema, 'users');
