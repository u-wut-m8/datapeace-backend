const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/UsersApp", {useNewUrlParser: true});

module.exports = {mongoose};
