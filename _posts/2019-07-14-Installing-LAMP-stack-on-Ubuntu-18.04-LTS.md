---
layout: post
title: Installing LAMP stack on Ubuntu 18.04 LTS
subtitle: A tutorial on how to install the linux-apache-mysql-php stack for web development.
tags: [web-dev]
---


This guide will cover how to install a LAMP ( Linux, Apache, MySQL, PHP ) stack on your Ubuntu machines. 

Most of this guide is taken from the following two tutorials –

- Installing LAMP stack (Except it installs MariaDB in place of MySQL)
- Installing and configuring MySQL on Ubuntu (Perfect guide for installing MySQL)

Acknowledgments out of the way, lets get started.

1. Installing MySQL –
	- sudo apt-get update   
	- sudo apt-get install mysql-server (This installs the server)
	- mysql_secure_installation (Sets up the server)
	- Set up a root password and enter Y for every option.
	- systemctl start mysql (Starts the server)
	- systemctl enable mysql (Starts the server automatically after every boot-up)
	- sudo /usr/bin/mysql -u root -p (Starts the mysql shell)

2. Installing Apache web server –
	- sudo apt install -y apache2 apache2-utils
	- sudo systemctl enable apache2
	- Type localhost in your browser to open the default page for Ubuntu apache.
	- For the final step, use the following command to set www-data (Apache user) as the owner of document root –
		- sudo chown www-data:www-data /var/www/html/ -R
		
3. Installing Apache 7.2 – 
	- sudo apt install php7.2 libapache2-mod-php7.2 php7.2-mysql php-common php7.2-cli php7.2-common php7.2-json php7.2-opcache php7.2-readline
	- sudo apt-install php7.2-fpm
	- sudo a2enmod proxy_fcgi setenvif
	- sudo a2enconf php7.2-fpm
	- sudo systemctl restart apache2

Finally, I suggest you to install phpMyAdmin to easily handle databases using GUI instead of CLI. For this, just follow [this](https://www.linuxbabe.com/ubuntu/install-phpmyadmin-apache-lamp-ubuntu-18-04) guide and you are done!

Thanks for reading folks, hopefully I will migrate my wordpress blog to my own server soon.
**Update** Well I migrated to github pages from wordpress, certainly an update. It provides free hosting, I might write a guide on this soon.