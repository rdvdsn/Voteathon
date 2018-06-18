var express = require('express');
var app = express();

// Do I need multiple mongeese (?) for running separate DBs?
var mongoose = require('mongoose');

// bring in the username and password for now for mongoDB and the getDBConnectionString() function
var config = require('./config');

// holds the sets of functions to be accessed when url requests are sent to port
var apiController = require('./controllers/apiController');

// defining port
var port =process.env.PORT || 3000;


//what is happening here?
app.use('/assets', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

// builds the MongoDB url and inputs the credentials (currently still test, test) 
mongoose.connect(config.getDbConnectionString());

// what exactly happens here - runs the functions within here to be "Primed" for the listen to port below????
apiController(app);

// listen on port
app.listen(port);