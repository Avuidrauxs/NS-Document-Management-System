[![Coverage Status](https://coveralls.io/repos/github/andela-aanchirinah/NS-Document-Management-System/badge.svg?branch=chore%2F146922329%2FSetup-Webpack-Task-Runner)](https://coveralls.io/github/andela-aanchirinah/NS-Document-Management-System?branch=chore%2F146922329%2FSetup-Webpack-Task-Runner)
[![Build Status](https://travis-ci.org/andela-aanchirinah/NS-Document-Management-System.svg?branch=develop)](https://travis-ci.org/andela-aanchirinah/NS-Document-Management-System)
[![Code Climate](https://codeclimate.com/github/andela-aanchirinah/NS-Document-Management-System/badges/gpa.svg)](https://codeclimate.com/github/andela-aanchirinah/NS-Document-Management-System)
[![codecov](https://codecov.io/gh/andela-aanchirinah/NS-Document-Management-System/branch/develop/graph/badge.svg)](https://codecov.io/gh/andela-aanchirinah/NS-Document-Management-System)

# NS-Document-Management-System
This is the Non Sucking Document Management System which unlike other document management systems that suck. You can try it out [here](https://staging-nsdms.herokuapp.com/).

So the system has the following features

 - Landing page with a sign-in and sign-up form
 - JWT Authentication to protect the routes
 - Dashboard where you can view all saved public documents
 - You can create new documents and set access privileges
 - You can also edit your saved documents
 - There is a search field for searching through for documents
 - Admin users can search through list of users
 - Admin can access private documents of normal users

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

First of all you need to make sure you have `nodejs` and its package manager , `npm` installed,

on Mac

```
brew install nodejs
```

on Linux(CentOS)

```
yum install nodejs
```

on Linux(Debain)
```
apt-get install nodejs
```

### Installing

To get the project running in your environment
First run the command below

```
npm install
```

Then you can run the NS-DMS app with the following
```
npm start
```



## Running the tests

Perform backend test by running the following code:

```
npm run server-test
```

And to perform client side test run the following code:
```
npm run test:client
```

To perform End to End testing
```
npm run E2E
```


## Deployment

This is how to deploy this on a live system

First of all you need to run the build script
```
npm run build
```

then install all the needed dependencies

```
npm install
```

Then you can run the NS-DMS app with the following
```
npm start
```

## Built With

* [NodeJS](https://nodejs.org/en/docs/) - The web framework used
* [React](http://reactjs.cn/react/docs) - An open-source JavaScript library for building user interfaces.
* [Redux](http://redux.js.org/#) - Used as a container for my states
* [Axios](https://rometools.github.io/rome/) - Library used to make my HTTP Client requests
* [Webpack](https://rometools.github.io/rome/) - Used to bundle modules
* [Material-UI](http://www.material-ui.com/) - Used to style my frontend interfaces

## Contributing

Please read [here](https://github.com/andela-aanchirinah/NS-Document-Management-System/wiki/How-to-Contribute-To-NSDMS) for details on code of conduct, and the process for submitting pull requests to me.


## Authors

* **Audax Anchirinah** - *Initial work* - [Faarentie](http://faarentie.com)



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* The Andela Family
* Me, for building this app within the shortest time possible
* My family and friends back in Ghana
