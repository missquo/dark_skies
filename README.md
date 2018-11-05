# Map Project

## Table of Contents

* [Introduction](#introduction)
* [Dependencies](#dependencies)
* [Using the App](#using-the-app)

## Introduction

As the final project of [Udacity](https://www.udacity.com/)'s Front End Nanodegree Program, this map application allows the user to explore the area around the United States's first Dark Sky Reserve in central Idaho. 

The object of this project was to gain practice using the React library.  It is a basic book organization tool, where the user can search for books by topic, and add them to their personalized bookshelf by category:  Currently Reading, Want to Read, or Read. [Udacity](https://www.udacity.com/) provided the static HTML, CSS, as well as a backend server with methods to access it. 

## Dependencies

This project was bootstrapped with React, and all necessary dependencies are listed in the package.json file included in the repository and can be installed using 'npm install'.  External data is pulled from APIs from [Google](https://www.google.com), the [National Park Service](https://www.nps.gov), and the USDA's [Recreation.gov](https://www.recreation.gov) website.

## Using the App

The app can be started using 'npm start'.  For full functionality, however, it is recommended that you take the steps to start the production build.  This can be done with 'npm run build' followed by 'serve -s build'.  Then navigate to localhost:5000.  Internet will be required to fetch the external data for the map and for the descriptions of the map locations.  Once loaded, the user can use the drop down menu to filter the map locations by points of interest, campgrounds, and hiking trailheads.

