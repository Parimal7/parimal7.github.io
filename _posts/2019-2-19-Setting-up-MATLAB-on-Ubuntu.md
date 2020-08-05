As a student of VIT-Bhopal you get access to an Academic License of MATLAB. Here are the steps to set it up and running on Ubuntu -

- Head over to this [page](https://in.mathworks.com/academia/tah-portal/vit-bhopal-university-40705117.html).

- Download the installer using the VIT-issued email id.

- Extract the zip folder to any directory ( let’s call it MATLAB ).

- In the MATLAB directory, run ./install.

- Log in using the email and password you used to sign up on the MATLAB website.

- Change the installation directory from usr/local/MATLAB2018b to home/x where x is any folder in your home directory, since it doesn’t let you install in the /usr directory. **

- Select the required components.

- After installation is finished and it has verified the license, you will have to run MATLAB from the terminal.

- Go to /home/x/bin and type ./matlab. (x is the folder you installed matlab in)

- Congrats! You have matlab up and running.

**- This step can also be solved using sudo ./install instead of just ./install but it leads to more errors which I couldn’t solve yet, do comment if you find a work around using sudo ./install.
