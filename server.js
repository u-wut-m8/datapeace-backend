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

app.get("/api/users", async (req, res) => {
  var queryString = req.query;
  if (Object.keys(queryString).length === 0)                  //Check if query string for GET /api/users is empty.
    User.find().sort({id: "asc"}).then(docs => {
      res.status(200).send(docs);
    }, err => {
      res.status(400).send(err);
    });
  else {
    var page = queryString.page, limit = parseInt(queryString.limit), name = queryString.name, sort = queryString.sort;
    var queryName = {};
    if (name)
      queryName = {$or: [{first_name: {$regex: name, $options: 'i'}}, {last_name: {$regex: name, $options: 'i'}}]};
    User.find(queryName).skip(limit*page).limit(limit).sort(sort).exec((err, docs) => {
      if (!err)
        res.status(200).send(docs);
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
