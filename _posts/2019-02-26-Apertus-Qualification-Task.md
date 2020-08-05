---
layout: post
title: Apertus Qualification Task
subtitle: Tackling the problem statements for proposal submission in Apertus.
tags: [gsoc]
---



Google Summer of Code proposal submissions start 25th March, and for this year I decided to try for Apertus Organisation. Read on to know my journey from solving the challenge task to submitting the final proposal.

This choice is basically because of two reasons - 

1. Their code base for software is in C++, which is the only language I am quite familiar with.
2. Their challenging task [T872](https://lab.apertus.org/T872) is really fun to solve, since it taught me a lot ( PPM file format, Debayering algorithms, make files, dynamic linking, etc).

In this post I will share what I learned, and how I learned it, for solving the challenging task. I have added links to tutorials/guides wherever needed.
After the submission, the mentors did gave me feedback to improve the code ( better indentation, splitting the code into functions, etc) which I will start working on right after writing this post.

The first task is –

1. Write a C/CPP program for loading a RAW12 [image](https://gist.github.com/lefticus/10191322) into the memory – separate the 4 channels (in memory – 8 bits). Output the intensity values of the first 5×5 pixels (square tile) R, G, G, B channels.

I read about RAW12 iiles form [Apertus Wiki](https://wiki.apertus.org/index.php/RAW12) , it’s a good resource to have some basic info about it. First task is to change the 12 bit values into 8 bit values and separate them into four different channels. ( If all this sounds confusing to you, have a look at [this](https://www.youtube.com/watch?v=LWxu4rkZBLw) 6 minute video).

By reading previous year’s logs, I found out that one way to solve this is to read 3 bytes at a time and do some bit shifting ( later on, I was told this isn’t a good approach by one of the mentors) to covert them to 8 bit pixel values. I copied the code from [here](https://github.com/TofuLynx/apertus-CppChallenge/blob/master/Code/RAWtoPNG.cpp).  DO NOT copy paste codes even if you perfectly understand them. Write everything from scratch ( learnt it the hard way when the mentors gave feedback on it). If you read it you will understand how it’s done and why it’s done that way.

The second task is –

2. Save the channels (separately) as valid image files (8 bits per pixel) named appropriately without use of any external libraries (e.g. openJPG/lodePNG). (Hint: PPM file format).

So this is a new challenge, last year students were allowed to use existing libraries to convert the data to png files using LodePNG. I had to convert them to [PPM](http://netpbm.sourceforge.net/doc/ppm.html) files. When I first read the linked page(provided by a mentor since I was too lazy to google it, don’t be lazy like me, use google), I was totally confused. You see, it mentions 2 types of PPM file formats, “raw” and “plain”. Raw format uses binary for pixel values where as plain format uses decimal.

I tried to convert the data to a raw ppm file using binary values for each pixel, but that was giving me a greyish image. I asked about it on the IRC but go no help, so decided to use plain ppm format for each channel. This time, it worked and I got the following images as output -

![Blue channel]({{ site.baseurl }}/images/2fe93d66-343b-418c-8002-64428fa6a59a.png "Blue Channel")
![Red channel]({{ site.baseurl }}/images/69d0d024-a731-4262-ac0b-f7b3f669ea78.png "Red Channel")
![Green channel]({{ site.baseurl }}/images/309f397c-09df-46c3-be9f-2e17c5885a99.png "Green Channel")

This took me 5-6 hours, since most of the time went in trying to use the raw ppm format (which I STILL don’t understand). Anyway, this finished the second task. On to the third –

3. Debayer the CFA ([color filter array](https://en.wikipedia.org/wiki/Color_filter_array)) data (in memory using nearest neighbour / bilinear) – output the image as a valid image file (8-bit, without use of any external library).

If you watched the video I linked earlier ([this](https://www.youtube.com/watch?v=LWxu4rkZBLw) one for the lazy readers), you will understand what debayering is. Basically, since every filter records only one colour, what we do is guess what the pixel value might be. Suppose we have only the red value, we will look around this red pixel and find out the average of the green and blue values and finally we will get the final colour of the pixel.

If you want a more comprehensive reading, read this [pdf](http://www.stark-labs.com/craig/articles/assets/Debayering_API.pdf) (which I used to study it). This pdf mentions 4 debayering techniques, but according to the task we can use either nearest neighbour or billinear interpolation(both of which are fairly simple). Now I needed to code it down.

This is another one of my blunders (first one was copying the 12 to 8 bit conversion code). After I studied it I knew exactly what I had to do, but being the lazy ass I am, I decided to copy it from somewhere (*ahem*, from the last year solution). DO NOT copy the code. The purpose of the challenge is to see what the student is capable of doing. If you just copy paste the code, it doesn’t show any originality, what YOU are capable of doing. Anyway, I got to know all these  things AFTER I submitted the challenge for review. Anyway, after debayering, I got this as the final image –

![Final image]({{ site.baseurl }}/images/screenshot-from-2019-02-26-12-36-44.png "Final image")

That completes the first three tasks. There was an optional task which I might complete later this week.

After this, it also mentioned that we get “bonus points” if –

1. Use cmake for building the C/CPP program
2. Abide by the C/CPP coding guidelines (https://gist.github.com/lefticus/10191322) and project structuring (create appropriate directories, header files, c/cpp files to modularize the code in meaningful ways). See collected information below.
3. If you can load part of your program as a dynamic library (.so file)
4. If you use a nonlinear curve for the 12 to 8 bit conversion, without ignoring the bottom 4 bits (lots of different solutions possible) and explain your choice (why did you choose that curve)

I decided to read about [cmake](https://cmake.org/cmake-tutorial/), [dynamic libraries](https://www.geeksforgeeks.org/working-with-shared-libraries-set-2/) and the [C++ coding guidelines](https://gist.github.com/lefticus/10191322).  This took me whole Sunday trying to understand everything and linking the parts. I finally made a CMakeLists.txt file, moved the debayering algorithm as a dynamic library to be loaded at runtime. But after dedicating 3-4 full days on this task, I got a bit lazy/tired. I should have followed the coding guidelines properly, I didn’t use proper modularization(splitting the code into functions), etc. These all came out when mentors went through my code.

I submitted my repository in the IRC, awaiting some constructive criticism. I got what I wanted xD, here is a summary of exactly what was mentioned –

1. Biggest complain first, everything is in the main()
2. Dynamic linking is a bit of overkill for such task, although you should use it for main task later.
3. Pre-compiled libs are a no-go for a project.
4. Also you need a header file for dynamic linking, so the functionality is really split.
5. Not sure why folks can’t get code formatting right … it’s not really rocket science is it? 🙂
6. It basically boils down to where to put spaces and where to avoid them consistently.
7. Braces should be in the new line for c++, same line is so java and javascript.
8. COLORImage looks a bit of a mix of C and C++, ColorImage is better as a variable name.
9. Just a side note, no need to use uint32_t for sizes, like 4096, as uint16_t is sufficient.
10. Please split the code in functions.
11. Seems quite a monolithic code.
12. Line 86-97 is a bit of an issue… 5×5 means the square tile containing 5 rows, 5 cols (first ones).

Another remark from a student who is also trying to apply this year –

“…also I went through parimal’s code which runs great but is very heavily reproduced form TofuLynx’s last year’s code. im unable to understand the essence of the task if we don’t make it all by ourselves…”

I agree with him, although after working really hard, it was tough for me to face so much criticism but I guess that’s how you grow. The final remark was –

“..your code is same as the code from Claudio, don’t know what i should grade then, as i don’t have any obvious points to evaluate..”

The debayering was a copy paste, yes, but except that everything I did was on my own. Also I used his code only after perfectly understanding that part. But alright, I will try to improve and code everything from scratch. I will submit the solution again this Sunday, till then, signing off 🙂