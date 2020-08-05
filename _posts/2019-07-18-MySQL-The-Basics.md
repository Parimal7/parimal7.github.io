---
layout: post
title: MySQL Basic Commands
subtitle: Simple syntax of MySQL
tags: [MySQL]
---


I am really bad with memorization, so this blog post will serve as a reference to the basic MySQL syntax I use in the class. 

To install MySQL in Ubuntu, follow [this](http://parimal.codes/Installing-LAMP-stack-on-Ubuntu-18.04-LTS/) guide.

PS: Most MySQL commands are capitalized to differentiate between the syntax and field names.

- Starting MySQL – sudo /usr/bin/mysql -u root -p

- Show list of databases – SHOW DATABASES;

- Create a database – CREATE DATABASE [database name];

- Deleting a database – DROP DATABASE [database name];

- Select a database – USE [database name];

- Creating a table – CREATE TABLE [table name] (fieldName datatype(length), … );

- Deleting a table – DROP TABLE [table name];

- See all the tables in a database – SHOW TABLES;

- Describe field formats in a table – DESCRIBE [table name];

- Rename a table – RENAME TABLE [old name] TO [new name];

- I will keep updating it as I learn new commands. Peace out.
