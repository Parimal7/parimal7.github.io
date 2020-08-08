---
layout: post
title: Internship Challenge for Terribly Tiny Tales
subtitle: A blog post on how I am going to solve the challenge tasks for an internship role.
tags: [web-dev]
---

So while searching for an internship, I stumbled upon [this](https://angel.co/company/terribly-tiny-tales/jobs/288898-full-time-intern-software-engineer-no-part-time-please) opening. I really liked the straight forward way of "do this challenge and apply" because it's a good way to weed out applications rather than relying on robotic ATS systems.

Also it's a web dev thing and most of my projects are in this domain so I decied to give it a try. I will be blogging simultaneously as I attempt to build the requried thing.

Here are the tasks required -

- A front end which accepts a number input N with a Submit button (extra points for building frontend in React or a HTML5 framework).
- On entering a value and pressing submit, a request should be sent to the backend (backend can be in any technology, extra points for using nodejs)
- From the backend, fetch a file hosted at http://terriblytinytales.com/test.txt
- From the backend, return the top N most frequently occurring words in this file (do not use a ready made module for frequency computation)
- Display the top N words and their frequency of occurrence in the frontend, in a tabular format

I have zero experience in react or nodejs so I think I will first do a quick tutorial about it.I will start with this [react tutorial](https://reactjs.org/tutorial/tutorial.html). Looks like they are building a tic-tac-toe game.

## Learning React and NodeJs

So first I gotta setup the local environment using the following command -

```
npx create-react-app my-app
```

After this I need to remove all the source files so I can start afresh.

```
cd my-app
cd src
rm -f *
cd ..
```

Add the given index.css and index.js files in the src directory which acts as skeleton code for the tic-tac-toe game, and start the server with -

```
npm start
```

