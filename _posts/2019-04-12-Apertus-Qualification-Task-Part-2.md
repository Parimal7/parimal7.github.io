---
layout: post
title: Apertus Qualification Task : Part 2
subtitle: Part 2 of the qualification task solution for GSOC 2019
tags: [gsoc]
---



This post is a follow up of my last post on the qualification task. 

So, after the reviews I received for my first challenge submission, I decided to do the following tasks –

- Refactor the code to separate it into different modules, using header files etc.
- Change the formatting, adhering to the C++ standards, like using lower camel case for variables ( myVariable ) and upper camelcase for functions ( MyFunction ).
- Change the indentation, using 4 space width, and using the opening braces in the next line and not the same line.
- Updating the CMake script so that it makes the dynamic object, and not the way I did it previously.

I also decided that I will be working on project T763, Frameserving Capabilities for OpenCine, so I had to complete the additional goal of storing the debayed image as a BMP file or as a frame in AVI format. Here’s a breakdown of how I approached the tasks –

## Refactoring the code, working on formatting – ##

This was easy, just had to to create new header files with function declarations and variables, following proper OOP guidelines, cpp file for function definitions, etc.

## Changing the CMake Script – ##

So last time, I created the dynamic file on my own using [this](https://www.geeksforgeeks.org/static-vs-dynamic-libraries/) guide, but this should be done by the CMake script, not me. A simple google search gave me a lot of tutorials on CMake and how to add the dynamic file, but if I had to recommend one, watch this [video](https://www.youtube.com/watch?v=pLy69V2F_8M) on dynamic linking.

## Studying about BMP file format – ##

The additional goal for T763 was saving the debayed image as a BMP file OR as a single frame in an AVI file. I decided to learn BMP file first and if time remains, I will try AVI too.

This one was the most frustrating task as I stumbled on so many obstacles. I will break this task down into different sub-tasks which I needed to perform –

- Understand the BMP file format.
- Implement the BMP file format.
- Debug the BMP file format.

Understanding it was easy, there are a lot of resources online to read the structure of the BMP file. Just a quick google search would suffice. The problem was implementing it and then debugging it. I read this [tutorial](https://solarianprogrammer.com/2018/11/19/cpp-reading-writing-bmp-images/) and it already had the code to read/write BMP file.

If you checked the linked tutorial, you will find the guy used #pragma pack. Google what it is and what it does. The problem with this piece of code is, it isn’t portable, it was MSVC specific. And if I don’t use it, the BMP file gives the error of “unsupported header size”. This was some padding issues which can be fixed by declaring a new structure for the magic number of BMP file format. You can find the final code here. Read the BMP_HEADER file and you will see how I removed the pragma push.

Also the worst part is, BMP file stores pixel in a different format…so had to calculate a mathematical forumula ( took me 1 hour..) to convert my saved pixels for BMP file. Oh well worth the effort I guess.

Writing it here feels like it was so easy, but oh boy did it take time. Do checkout my github for the final code. Repo name is Apertus-T872

Here is the link – https://github.com/Parimal7

My next post will be on the project I wanted to work on. Till then, sayonara.

