const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
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
  var queryString = req.query;
  if (Object.keys(queryString).length === 0)                  //Check if query string for GET /api/users is empty.
    User.find().sort({id: "asc"}).then(docs => {
      res.status(200).send(docs);
    }, err => {
      res.status(400).send(err);
    });
  else {
    /*Fetch parameters from the query string.*/
    var page = queryString.page-1, limit = parseInt(queryString.limit), name = queryString.name, sort = queryString.sort;
    var queryName = {};
    if (name)
      queryName = {$or: [{first_name: {$regex: name, $options: 'i'}}, {last_name: {$regex: name, $options: 'i'}}]};      //If name parameter found in first_name or last_name fields.
    User.find(queryName).skip(limit*page).limit(limit).sort(sort).exec((err, docs) => {                                  //Specify sort, limit and pagination criteria.
      if (!err)
        res.status(200).send(docs);
    });
  }
});

/*Data needs to be sent to server in JSON format as request payload.*/
app.post("/api/users", (req, res) => {
    var user = new User({
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      company_name: req.body.company_name,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email: req.body.email,
      web: req.body.web,
      age: req.body.age
    });
    user.save().then( doc => {
      res.status(201).send();
    }, err => {
      res.status(400).send(err);
    });
});

app.get("/api/users/:id", (req, res) => {                                       //Get individual record by id parameter.
  var id = req.params.id;
  User.find({id}).then(doc => {
    if (!doc)
      res.status(404).send();
    res.status(200).send(doc);
  }, err => {
    res.status(400).send(err);
  });
});

app.patch("/api/users/:id", (req, res) => {                                     //Update first_name, last_name and age fields of record having given id.
  var id = req.params.id;
  var body = _.pick(req.body, ["first_name", "last_name", "age"]);
  User.update({id}, {$set: {first_name: body.first_name, last_name: body.last_name, age: body.age}}, {upsert: true}, (err, doc) => {
    if (!err)
      res.status(200).send();
  });
});

app.delete("/api/users/:id", (req, res) => {                                    //Remove record having given id.
  var id = req.params.id;
  User.remove({id}, err => {
    if (!err)
      res.status(200).send();
  });
});

app.listen(3000, () => {                                                        //Listen on port 3000.
  console.log("Server is running on port 3000.");
});
