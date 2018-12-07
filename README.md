# Datapeace Backend Assignment
---
**REST API using Node.js for managing user's data.**

### Requirements
- Node.js (v7.6.0 or higher)
- MongoDB (v3.6.0 or higher)
- Tools for testing the API like
  - Postman
  - curl
  - Standard browser
- Optional
  - Robo3T (for directly checking database)
  - Nodemon (Automatically restarts server on every change.)

### Instructions
- The project is hosted on [Datapeace API Assignment](https://github.com/u-wut-m8/datapeace-backend).
- Clone the project from command line using `git clone https://github.com/u-wut-m8/datapeace-backend` or download as ZIP.
- Go to mongoDB executables folder on local machine using `cd /[path-to-installed-mongoDB]/bin`.
- Run mongoDB using `./mongod --dbpath /[path-of-project-folder]/mongo-data.`
- Change current working directory to the project directory.
- All required modules are listed as dependencies package.json file of project folder.
- Download dependencies using `npm install`.
- Run the server through command line using `node server.js`.
- Go to [http://localhost:3000](http://localhost:3000) and start testing. :+1:

### Routes
- [http://localhost:3000/api/users](http://localhost:3000/api/users) : GET request to display all records
- [http://localhost:3000/api/users?page=X&limit=Y&name=Z&sort=-W](http://localhost:3000/api/users?page=X&limit=Y&name=Z&sort=-W) : GET request to filter records according to query string parameters.
- [http://localhost:3000/api/users](http://localhost:3000/api/users) : POST request to add record to database; Data needs to be provided in request header in JSON format.
- [http://localhost:3000/api/users/{id}](http://localhost:3000/api/users/{id}) : GET request to display record having the given id.
-  [http://localhost:3000/api/users/{id}](http://localhost:3000/api/users/{id}) : PATCH request to update record having the given id; Update data needs to be provided in request header in JSON format.
- [http://localhost:3000/api/users/{id}](http://localhost:3000/api/users/{id}) : DELETE request to remove record having the given id.

### Notes
- A count check is done before starting the app in server.js to feed sample data from given website to database. This is done to avoid redundant copies of records during development. It can be modified by tester to meet testing requirements.
- PATCH is used instead of PUT because we are not concerned with the entire record rather some given fields of a record.
- MongoDB database folder path was hardcoded during development for convenience and can be changed to suit other testing and deployment environments.
