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
NOTE: Replace '<password>' with the password of DB admin, and make sure to replace the brackets as well. 

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
}, {
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
}, {
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

Before moving on, we need to tell the server to use the files we just created.

Add the following lines into server.js -

```javascript
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
```
Next we edit the users.js file for routing -

```javascript
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
	.then(users => res.json(users))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
	.then(() => res.json('User added!'))
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
```

Since I have already worked with Django and PHP before, I understand all this code, exactly what they are doing so not gonna write any notes here.

Now time to edit the exercises.js file -

```javascript
const router = require('express').Router();
let Exercise = require('../models/exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
	.then(exercises => res.json(exercises))
	.catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
	username,
	description,
	duration,
	date
    });
    
    newExercise.save()
	.then(() => res.json('Exercise added!'))
	.catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
```
## Testing the server API

Download the insomnia API testing app using the following command -

~~~
sudo snap install insomnia
~~~

To test if the API is working correctly, just create a new POST or GET request and send the data accordingly. It's working fine till here.

## Adding routes to exercises.js

We need exercises.js to perform more operations than simply adding exercises. Add the following lines to exercises.js -

```javascript
router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
```

Running the server after this gives an error saying cannot connect to MongoDB ATLAS. This has to do with me using a different IP address since
the database grants access to specific IP address which we tell while creating the cluster.

To solve this just go to MongoDB ATLAS site,  in the left side navigation links go to Network Access and add your current IP address.

All the new routes works fine when testing using insomnia. Time to move on to frontend.

## Frontend

React is a Javascript library for building user interfaces. We use components to tell React what we wish to see on the screen.
When the data changes, react automatically re-render our components.

Starting the development server -

~~~
npm start
~~~

Also we need bootstrap CSS to make styling for our project easier.

~~~
npm install bootstrap
~~~

Next we need to setup React Router.

~~~
npm install react-router-dom
~~~

So the tutorial has...pasted many lines of code of React...so I will do the same and then understand them.

So every component needs a .js file, and all this goes inside the main App.js file.

App.js file will look like this -


```javascript
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
```

Now we make a new folder inside the /src directory (where App.js exists) and make 5 new .js files for each component. These are -

- navbar.component.js
- exercises-list.component.js
- edit-exercise.component.js
- create-exercise.component.js
- create-user.component.js

Code for each file -

navbar.component.js -

```javascript
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">ExcerTracker</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Exercises</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Create Exercise Log</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Create User</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}
```

For testing the site now, we will add some stub code to other components -

exercises-list.component.js:

```javascript
import React, { Component } from 'react';

export default class ExercisesList extends Component {
  render() {
    return (
      <div>
        <p>You are on the Exercises List component!</p>
      </div>
    )
  }
}
```

edit-exercise.component.js:

```javascript
import React, { Component } from 'react';

export default class EditExercise extends Component {
  render() {
    return (
      <div>
        <p>You are on the Edit Exercise component!</p>
      </div>
    )
  }
}
```

create-exercise.component.js:

```javascript
import React, { Component } from 'react';

export default class CreateExercise extends Component {
  render() {
    return (
      <div>
        <p>You are on the Create Exercise component!</p>
      </div>
    )
  }
}
```

create-user.component.js:


```javascript
import React, { Component } from 'react';

export default class CreateUser extends Component {
  render() {
    return (
      <div>
        <p>You are on the Create User component!</p>
      </div>
    )
  }
}
```