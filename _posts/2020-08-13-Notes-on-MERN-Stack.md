---
layout: post
title: Notes on MERN Stack
subtitle: MongoDB-Express-React-NodeJs : Notes on a MERN-stack tutorial
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
npm install express cors mongoose dotnev
~~~