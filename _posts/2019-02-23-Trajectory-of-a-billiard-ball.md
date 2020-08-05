I am taking a computational physics course this semester, and one of my assignment was to plot the trajectory of a billiard ball and use Euler’s method to solve it. Here's a simple guide for it.

I used MATLAB ( you can view my post on how to install MATLAB on Ubuntu [here](http://parimal.codes/Setting-up-MATLAB-on-Ubuntu/)) for the assignment.

Assumptions –

- Table is friction less.
- All collisions are elastic.
- The table is a square. with origin being the centre of the table.

![A 2-D Grid]({{ site.baseurl }}/images/screenshot-from-2019-02-23-14-27-48.png "2-D grid")

Whenever the ball strikes either x = 4 or x = -4, its velocity in the x direction is reversed and velocity in y direction remains same.

Similarly, if the ball strikes y = 4 or y = -4, its velocity in the y direction is reversed and the velocity in x direction remains same.

These will be the boundary condition for our code.  The initial conditions are from the assignment problem.

![Source code]({{ site.baseurl }}/images/screenshot-from-2019-02-23-14-34-09.png "Source code")


![Output]({{ site.baseurl }}/images/screenshot-from-2019-02-23-14-31-34.png "Output")

That’s it basically. Nothing impressive, but I was getting bored so decided to blog it down anyway.
