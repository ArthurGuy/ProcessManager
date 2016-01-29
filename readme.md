[![GitHub License](https://img.shields.io/github/license/ArthurGuy/ProcessMonitor.svg?style=flat-square)]
[![Scrutinizer](https://img.shields.io/scrutinizer/g/ArthurGuy/ProcessMonitor.svg?style=flat-square)](https://scrutinizer-ci.com/g/ArthurGuy/ProcessMonitor/)
[![Travis](https://img.shields.io/travis/ArthurGuy/ProcessMonitor.svg?style=flat-square)](https://travis-ci.org/ArthurGuy/ProcessMonitor)

# Process Monitor

### A simple web app for monitoring cron jobs or other regularly occurring processes

Using the system is as simple as have your cron jobs call a url within process monitor whenever they finish their run,
if they stop checking in an alert is generated and emails are sent out.

This is meant as a single tenant hosted application, ideal for running within a company.

Login is via usernames and passwords or alternatively via GitHub with the option to restrict to a particular organisation.
All users become contacts for alerts but more can be added and the users removed if needed, contacts can also be
assigned a series of tags which allow the assignment to particular pings only.

##Setting it up
Getting everything setup is straight forward, you need to checkout the code and create a `.env` file, the `.env.example`
file can be used for this.

You need to specify the database hostname, username and password as well as the name of a database the user has full permission over.

A 32 character random `APP_KEY` needs to be chosen, this should be unique and kept secure.

Next `composer install` and `npm install` should be run to download the required libraries and packages.
When npm has finished `gulp` can be run to build the frontend assets

The server should be run using something like nginx but for local development the built in web server can be used.
`php artisan serve`

