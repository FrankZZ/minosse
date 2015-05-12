var _ = require('lodash');
var moment = require('moment');
var path = require('path');
var util = require('util');

var typeMap = {
    'string': parseString,
    'int': parseInt,
    'float': parseFloat,
    'boolean': JSON.parse,
    'object': parseObject,
    'date': parseDate,
    'dateISOString': parseDateISOString,
    'undefined': function () { return undefined; },
    'null': function () { return null; },
    'property': parseProperty,
    'uuid()': require('node-uuid').v4,
    'testdata': loadTestData,
    'file': loadFileData,
    'templateString': parseTemplateString
};

//Add aliases
typeMap.number = typeMap.float;
typeMap.bool = typeMap.boolean;

module.exports = typeMap;

function parseString(valuestring) {
    if (typeof valuestring === 'undefined') {
        return '';
    }
    return valuestring;
}

function parseObject(valueString) {
    try {
        return JSON.parse(valueString);
    } catch (err) {
        throw new Error('Invalid JSON: ' + valueString);
    }
}

function parseDate(valueString) {
    var date = null;
    var dateRegex = /(\d+) days? (from now|ago)/;
    if (valueString === 'now') {
        date = moment();
    } else if (dateRegex.test(valueString)){
        var regexResult = dateRegex.exec(valueString);
        var amountOfDays = parseInt(regexResult[1], 10);
        var addOrSub = (regexResult[2] === 'ago') ? 'subtract' : 'add';
        date = moment()[addOrSub](amountOfDays, 'days');
    } else {
        date = moment(new Date(valueString));
    }

    //Return the date or dateString.
    return date.toDate();
}

function parseDateISOString(valueString) {
    var isValidDatestring = moment(valueString, moment.ISO_8601).isValid();
    if (isValidDatestring) {
        return valueString;
    }
    var date = parseDate(valueString);
    var dateISOString = date.toISOString();
    return dateISOString;
}

function parseProperty(propertyString) {
    var value = this.getProperty(propertyString);
    return value;
}

function loadTestData(fileName) {
    var testConfig = this.testConfig;
    if (!testConfig) {
        throw new Error('No test configuration found.\n' +
            'You can add one by adding a property called `testConfig` to the word object.');
    }
    var testDataRoot = testConfig.testDataRoot;
    if (!testDataRoot) {
        throw new Error('No test data root path found.\n' +
            'You can add one by adding a property called `testDataRoot` to the test configuration.');
    }
    var filePath = path.join(testDataRoot, fileName + '.json');
    this._log.trace({ path: filePath }, 'Loading file.');

    //Don't use `require` because that caches the returned object.
    var json = require('fs').readFileSync(filePath, { encoding: 'utf8'});
    var value = null;
    try {
        value = JSON.parse(json);
    } catch(err) {
        throw new Error(util.format('File %s contained invalid JSON.', filePath));
    }
    this._log.trace({ loadedData: value }, 'File loaded.');
    return value;
}

// This function expects a full fileName with extension included!
function loadFileData(fileName) {
    var testConfig = this.testConfig;
    if (!testConfig) {
        throw new Error('No test configuration found.\n' +
            'You can add one by adding a property called `testConfig` to the word object.');
    }
    var testDataRoot = testConfig.testDataRoot;
    if (!testDataRoot) {
        throw new Error('No test data root path found.\n' +
            'You can add one by adding a property called `testDataRoot` to the test configuration.');
    }
    var filePath = path.join(testDataRoot, fileName);
    this._log.trace({ path: filePath }, 'Loading file.');

    //Don't use `require` because that caches the returned object.
    var value = require('fs').createReadStream(filePath);
    this._log.trace({ loadedData: value }, 'File loaded.');
    return value;
}

var INTERPOLATION_REGEX = /{(.+?)}/g;
function parseTemplateString(templateString) {
    if (typeof templateString === 'undefined') {
        return '';
    }
    var compiled = _.template(templateString, null, { interpolate: INTERPOLATION_REGEX });
    var valueString = compiled(this);
    return valueString;
}
