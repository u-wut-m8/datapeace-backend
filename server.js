const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');

var app = express();                                          //Begin our express server.

app.use(bodyParser.json());                                   //Use middleware to parse the string body into JSON.

app.get("/", (req, res) => {
  res.send("Hello, world!");
});



app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
