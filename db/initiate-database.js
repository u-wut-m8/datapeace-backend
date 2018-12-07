const request = require('request');
const {MongoClient} = require('mongodb');
const {mongoose} = require('./mongoose');
const {User} = require('./../models/user');


//Since request is an asynchronous function, wrap it around a callback and wait for request() to fetch data from website.
var downloadPage = () => {
  return new Promise((resolve, reject) => {
    request({
      url: "http://demo9197058.mockable.io/users",
      json: true
    }, (error, response, body) => {
      if (error)
        reject(error);
      if(response.statusCode != 200)
        reject(`Invalid status code <${response.statusCode}>.`);
      resolve(body);
    });
  });
};

//Using ES7 async/await feature.
var myBackEndLogic = async () => {
  try {
    const data = await downloadPage();

    for(var i=0;i<data.length;i++){
      var user = new User({
        id: data[i].id,
        first_name: data[i].first_name,
        last_name: data[i].last_name,
        company_name: data[i].company_name,
        city: data[i].city,
        state: data[i].state,
        zip: data[i].zip,
        email: data[i].email,
        web: data[i].web,
        age: data[i].age
      });
      user.save().then((doc) => {
        console.log(doc);
      }, (err) => {
        console.log(err);
      });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {myBackEndLogic};
