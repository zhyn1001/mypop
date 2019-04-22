var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');
var Users = mongoose.model('User', UserSchema);

module.exports = Users;