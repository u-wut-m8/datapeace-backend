const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const {MongoClient} = require('mongodb');
const {myBackEndLogic} = require('./db/initiate-database');

myBackEndLogic();                                             //Feed database with data from website.

var app = express();                                          //Begin our express server.

app.use(bodyParser.json());                                   //3rd party middleware to parse the string body into JSON.

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
