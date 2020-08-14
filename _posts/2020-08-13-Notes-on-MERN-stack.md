---
layout: post
title: Notes on MERN Stack
subtitle: Learning the MongoDB-Express-React-NodeJs stack cause why not.
tags: [web-dev]
---

The following post is a bunch of notes I will take while learning the MERN stack from [this](https://youtu.be/7CqJlxBYj-M) tutorial. I am learning MERN stack to
apply for an intern role which has a "challenge" to create a little demo app using React and Node.js.

## MERN Stack

- MongoDB: A document based open source database.
- Express: A web application framework for Node.js
- React: A JavaScript front-end library for building user interfaces.
- Node.js: JavaScript run-time environment that executes JavaScript code outside of a browser.

Apart from these, the tutorial will also use *Mongoose*, a simple schema-based solution to model application data.

## Database terminology

| Relational | MongoDB |
| :-------- | :----- |
| Database | Database |
| Table | Collection |
| Row | Document |
| Index | Index |
| Join | $lookup |
| Foreign | Reference |


## MongoDB setup

MongoDB stores data on disk in BSON format, or binary JSON. We will use MongoDB Atlas which is cloud based, instead of installing and using it locally.
A note here is that I can get some free credits of MongoDB Atlas using my Github Student Pack.

## Setting up code

First verify if node is installed

~~~
node -v
~~~

It is installed on my machine, check.

Next we create the react project by using npx command, which runs create-react-app without installing it first.(confusing statement but whatever).

~~~
npx create-react-app mern-exercise-tracker
~~~

Enter the mern-exercise-tracker directory and create a backend folder.

~~~
cd mern-exercise-tracker
mkdir backend
~~~

Now we create a package.json file (no idea what that means) -

~~~
npm init -y 
~~~

Now we install a bunch of dependencies -

~~~
npm install express cors mongoose dotenv
~~~

- *cors* stands for cross-origin resource sharing allows AJAX requests to skip the same origin policy and access resources from remote hosts.
- *dotenv* loads environment variables from a .env file into a process.env file which somehow makes development simpler.

Now we install one last package globally -

~~~
npm install -g nodemon
~~~

- *nodemon* automatically restarts the node application when file changes in the directory are detected.

Now we create a new file called server.js in the backend directory, and the tutorial copy-pastes some javascript code.


```javascript
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log('Server is running on port: ${port}');
});
```
Now we can start the server using the command -

~~~
nodemon server
~~~

And it is working. Moving right along.

Next we add the database connection code to server.js, and it looks like this -

```javascript
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log('Server is running on port: ${port}');
});
```

The uri is an environment variable which we get from MondoDB ATLAS. This goes to a .env file in the backend directory.
NOTE: replace <password> with the password of DB admin, and make sure to replace the brackets as well. 

** Setting up MongoDB ATLAS

Just visit the MongoDB ATLAS website, create a free account and use the free tier one. Create a new cluster and copy the connection string.

Next we create a new directy in the backend directory for the database models of our app, along with the files for those models.

~~~
mkdir models
cd models
touch exercise.model.js
touch user.model.js
~~~

Time to copy paste more code!

For file user.model.js -

```javascript
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
	type: String,
	required: true,
	unique: true,
	trim: true,
	minlength: 3
    },
} {
    timestamps: true, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

For file exercise.model.js -

```javascript
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true},
    duration: { type: Number, required: true},
    date: { type: Date, required: true},
} {
    timestamps: true, 
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
```
Now we need to add the API endpoint routes so that the server can be used to perform the CRUD applications (create, read, update, delete).
Inside the backend folder, create another folder called routes, and create 2 files called exercises.js and users.js.

~~~
mkdir routes
cd routes
touch exercises.js users.js
~~~

