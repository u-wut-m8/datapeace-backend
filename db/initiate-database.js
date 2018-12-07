const request = require('request');
const {MongoClient} = require('mongodb');

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
    MongoClient.connect("mongodb://localhost:27017/UsersApp", {useNewUrlParser: true}, (err, client) => {
      if (err)
        return console.log("Error connecting to database server.");
      var db = client.db("UsersApp");
      for(var i=0;i<data.length;i++)
        db.collection("Users").insertOne({
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
        }, (err, result) => {
          if (err)
            return console.log("Unable to insert user #", i+1);
          console.log(JSON.stringify(result.ops, undefined, 4));
        });
        client.close();
      });
  } catch (err) {
    console.log(err);
  }
};

myBackEndLogic();
