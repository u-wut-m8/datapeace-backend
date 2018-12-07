const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const {MongoClient} = require('mongodb');
const {myBackEndLogic} = require('./db/initiate-database');
const {User} = require('./models/user');

User.find().count((err, count) => {
  if (count != 500){
    User.remove({}, err => {
      console.log("Removed previous data.");
    });
    myBackEndLogic();                                         //Feed database with data from website.
  }
});

var app = express();                                          //Begin our express server.

app.use(bodyParser.json());                                   //3rd party middleware to parse the string body into JSON.

app.get("/api/users", (req, res) => {
  User.find().sort({id: "asc"}).then(docs => {
    res.status(200).send(docs);
  }, err => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
