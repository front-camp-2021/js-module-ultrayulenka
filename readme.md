# JavaScript module 

## To start project:

To start project, please run the next commands:

* `npm install` - install dependencies

**Note:** You must have installed Nodejs and Npm on your local machine  
To check versions of Nodejs and Npm please run in terminal: `node -v` и `npm -v`  
Required versions:
```
  "engines": {
    "node": ">=14.0.0",
    "npm": ">=6.0.0"
  }
```

* `npm run start:backend` - start backend server

```
  Resources
  http://localhost:3000/products
  http://localhost:3000/categories
  http://localhost:3000/brands

  Home
  http://localhost:3000

```


## To run tests:

### To run all tests

To run all project tests:

`npm test`

[![asciicast](https://asciinema.org/a/eQoQWJZxby1D70oyH3Isb81AS.svg)](https://asciinema.org/a/eQoQWJZxby1D70oyH3Isb81AS)

### To run tests from a specific directory

Please use next command to run tests from a specific directory

`npm test -- --findRelatedTests <path>`

For example, the next command runs all "spec" files from "01-sum" directory:

`npm test -- --findRelatedTests 01-sum/**/*.spec.js`

where `01-sum/**/*.spec.js` is a path to task directory

[![asciicast](https://asciinema.org/a/a7B58jAY26BfdOyvalZAKeyi2.svg)](https://asciinema.org/a/a7B58jAY26BfdOyvalZAKeyi2)

### To run a single test

To run only one test, please use next command:

`npm test -- -t '<describeString> <itString>'`

* `describeString` is a name of "describe" block
* `itString`is a name of "it" block

For example, next command runs "describe" with name "sum" and "it" with name "should return sum of numbers":

`npm test -- -t 'sum should return sum of numbers'`

[![asciicast](https://asciinema.org/a/MpbJdYjjmL3SzVkIHDT2CB7Vw.svg)](https://asciinema.org/a/MpbJdYjjmL3SzVkIHDT2CB7Vw)

For more details please check official Jest documentation [Jest](https://jestjs.io/docs/en/cli.html#--testnamepatternregex)
