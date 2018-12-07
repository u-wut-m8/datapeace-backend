const mongoose = require('mongoose');

mongoose.Promise = global.Promise;                                              //Use JavaScript's standard Promise instead of mongooses' Promise.

mongoose.connect("mongodb://localhost:27017/UsersApp", {useNewUrlParser: true});

module.exports = {mongoose};
