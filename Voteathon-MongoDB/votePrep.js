// will need mongoose in terms of downloading the core sets once they are populated

var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.getDBConnectionString());
mongoose.promise=global.promise;
var db = mongoose.connection;

// this means I will also need the models for entries, voters and blocks

var BlockForVote = require('./models/BlockForVote');
var Entry = require('./models/Entry');
var Voter = require('./models/Voter');

// will also need the util functions to have been created and brought in

var dwnldFuncs = require('./functions/downloading');
var utilFuncs = require('./functions/utils');


// download the databases into an array (presume this is okay given the expected table sizes)

doDownloading = function () {
    return new Promise ((resolve, reject) => {
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        dwnldFuncs.downloadEntries().then((items) => {       
            db.close();
            resolve( items);
        }).catch((err) => { reject(err)});

    })
};


tryAgain = async function() {

    try {
        let dwnldData = await doDownloading();
        console.log(dwnldData[2].entryLink);
        return dwnldData;
    }
    catch(error) {

    }
}



tryAgain();


// work out sizes/stats on the downloaded content???