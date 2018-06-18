var express = require ('express');
var bodyParser = require('body-parser');

var routes = require('./routes/userSubmission');
var app = express();

var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.getDBConnectionString());
mongoose.promise=global.promise;
var db = mongoose.connection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', routes);

var port = 3000;

app.listen(port, () => {
    console.log(`Server running on localhost:${port}.`)
});