# AutoMart
[![Build Status](https://travis-ci.com/Segun-Ogundipe/Auto_Mart.svg?branch=develop)](https://travis-ci.com/Segun-Ogundipe/Auto_Mart)
[![Coverage Status](https://coveralls.io/repos/github/Segun-Ogundipe/Auto_Mart/badge.svg?branch=develop)](https://coveralls.io/github/Segun-Ogundipe/Auto_Mart?branch=develop)

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

------------------------------------------------------------------------------

## User Interface (UI)
* HTML
* CSS
* Javascript

### GitHub Pages link for UI
[AutoMart](https://segun-ogundipe.github.io/Auto_Mart/UI)

------------------------------------------------------------------------------

## SERVER

## API ENDPOINTS

| Resource URL | Methods  | Description  |
| ------- | --- | --- |
| /api/v2/auth/signup| POST | Create user |
| /api/v2/auth/login | POST | Signin user |
| /api/v2/auth/:email/reset_passord | POST | Update/Reset user's password |
| /api/v2/car | POST | Post a car sale advert |
| /api/v2/car/:id/price | PATCH | Update the price of a posted Advert |
| /api/v2/car/:id/status | PATCH | Update the status of a posted Advert |
| /api/v2/car/:id | GET | Get a specific car by its id |
| /api/v2/car | GET | Get all cars (Admin) |
| /api/v2/car?status=available | GET | Get all available cars |
| /api/v2/car?status=available&state=new | GET | Get all available cars by their state (ne/used) |
| /api/v2/car?status=available&min_price=12345678 | GET | Get all available cars with prices that are either greater than or equal to the provided price |
| /api/v2/car?status=available&max_price=9876543 | GET | Get all available cars with prices that are either lower than or equal to the provided price |
| /api/v2/car?status=available&min_price=12345678&max_price=9876543 | GET | Get all available cars within the price range of the provided min_price and max_price |
| /api/v2/car?status=available&state=new&min_price=12345678&max_price=9876543 | GET | Get all available cars within the provided price range and the provided state |
| /api/v2/car?status=available&manufacturer | GET | Get all available cars by manufacturer |
| /api/v2/car?status=available&state=new&min_price=12345678&max_price=9876543&manufacturer | GET | Get all available cars filtered by the provided parameters |
| /api/v2/car/:id | DELETE | Delete a posted advert (Admin) |
| /api/v2/order | POST | Post a purchase order |
| /api/v2/order/:id/price | PATCH | Update the price of a purchase order |

## Used Tools

### Server Environment
```
 NodeJS
```
### Framework
```
 Express
```
### Testing Framework and assertion library
```
 Mocha and Chai
```
### Continuous Integration
```
Travis CI
```
### Test Coverage
```
Coveralls
```
### Deployment
```
Heroku
```
### Heroku
[AutoMart](https://automart-db.herokuapp.com)

### Documentation
[Swagger Doc](https://automart-db.herokuapp.com/api/v2)

------------------------------------------------------------------------------

## Installing / Getting started

After cloning the project cd into it and run

```shell
npm install
npm run start
```

The first line installs the necessary libraries. The second line starts up the server so the endpoints can be accessed

## Developing

To start developing the project further run the following in the command line:

```shell
git clone https://github.com/Segun-Ogundipe/Auto_Mart.git
cd Auto_Mart/
npm install
```

`git clone` downloads a copy of the project and place it in 'Auto_Mart' folder.
`cd` command gets you into the Auto_mart directory and `npm install` installs the libraries in package.json

## Links

- [Project homepage](https://github.com/Segun-Ogundipe/Auto_Mart)
- [Issue tracker](https://github.com/Segun-Ogundipe/Auto_Mart/issues)
- [UI](https://segun-ogundipe.github.io/Auto_Mart/UI)
- [API](https://automart-db.herokuapp.com)
- [Swagger Doc](https://automart-db.herokuapp.com/api/v2)