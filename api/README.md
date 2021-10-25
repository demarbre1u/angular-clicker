# Angular Clicker API

This API is based on a boilerplate you can find [here](https://github.com/raghavgarg1257/nodejs-mysql-boilerplate).

It is used by my Angular Clicker project. You can find the source code of this project [here](https://github.com/demarbre1u/AngularClicker).

## Pre-requisites:
1. NodeJS (https://nodejs.org/en/)
2. Globally installed nodemon (https://nodemon.io/)


## Steps to run:
```
git clone git@gitlab.com:raghavgarg1257/nodejs-mysql-boilerplate.git
cd AngularClicker_API
npm install
```
To install the base data used by the Angular Clicker project, a SQL file is available in the root directory. Simply import it to your MySQL database.

Now to start the server
```
npm start
```
The app will be started on the mentioned port which will be printed in the console upon starting the server like: `http://localhost:8080`.


## Available routes

### Users
```
-> GET /users : Show all the users in the app
-> POST /users : Add a new user
-> GET /users/:id : Get the user info by id
-> PUT /users/:id : Update a user info
-> GET /users/:id/save : Get the user's save info by id
-> GET /users/:name : Get the user info by name
```
### Saves
```
-> GET /saves : Show all the saves in the app
-> POST /saves : Add a new save
-> GET /saves/:id : Show the data of a save 
-> PUT /saves/:id : Update the data of a save
```
### Monsters
```
-> GET /monsters : Show all the monsters in the app
-> GET /monsters/:id_zone/zones : Show the data of monsters that belong to a given zone 
```
### Zones
```
-> GET /zones : Show all the zones in the app
-> GET /zones/:id : Show the data of a given zone
```
### Weapons
```
-> GET /weapons : Show all the weapons in the app
-> GET /weapons/type/:type : Show the data the weapons that belong to a given weapon type
```
