var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var util = require('util');

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send(200, {
        message: 'hello world'
    });
});

app.get('/hello/:name', function (req, res) {
    var greeting = util.format('hello %s', req.params.name);
    res.send(200, {
        message: greeting
    });
});

app.post('/hello', function (req, res) {
    var name = util.format(req.body.name);
    res.send(200, {
        name: name
    });
});

app.post('/hello/lastName', function (req, res) {
    var name = util.format(req.body.lastName);
    res.send(200, {
        lastName: name
    });
});

var server = app.listen(3000, function () {
    console.log('Example app listening at http://127.0.0.1:3000');
});
