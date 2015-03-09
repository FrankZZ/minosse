<a href="https://github.com/icemobilelab/minosse"><img src="https://raw.githubusercontent.com/icemobilelab/minosse/master/images/minosse.png" align="center"  height="300" width="600"/></a>

# Minosse
[![NPM version](https://badge.fury.io/js/minosse.svg)](http://badge.fury.io/js/minosse)

Common steps for testing api's using [Cucumber.js](https://github.com/cucumber/cucumber-js).

## Usage
Install the library:
```
npm install minosse --save-dev
```
Create a steps file in your project and load the api teststeps from there and add an optional configuration:
```js
module.exports = function myCustomSteps() {
    require('minosse').call(this);
    this.Before(function loadTestConfig(done) {
        this.testConfig = {
            defaultHost: 'localhost',
            defaultPort: 8080
        };
        done();
    });
}
```
Use the steps in your feature file:
```cucumber
Given I set property request body to number-array 1,2,3
When I send a POST request to /sum
Then the response status code is 200
And I check property sum of response body equals number 6
```

### What's next?
- [Check out which test steps you can use](https://github.com/icemobilelab/minosse/wiki/Steps)
- [Save the log output of the steps](https://github.com/icemobilelab/minosse/wiki/Logging)
- [Create custom steps](https://github.com/icemobilelab/minosse/wiki/Custom-steps)

## Development

### Style
We have an `.editorconfig` file to help us having a consistent coding style.
[Please install a plugin for your editor](http://editorconfig.org/).

We use `eslint` for code linting.
[There are plugins for that too](http://eslint.org/docs/integrations/).

### Tasks
We use gulp as a task runner. Install it globally first: `npm install -g gulp`.
To see a list of gulp commands, run:

    gulp help

### Git hooks
In the `package.json` you can see a pre-commit and pre-push hook.
On commiting or pushing these commands are executed.
If they fail, the commit/push will fail.
Add the `--no-verify` flag to your commit or push to bypass these checks.

## Swag
[![wercker status](https://app.wercker.com/status/f0c2295b27704388dabc1ade1a60b932/m/master "wercker status")](https://app.wercker.com/project/bykey/f0c2295b27704388dabc1ade1a60b932)
