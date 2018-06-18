var seedFuncs = require('./functions/seeding');

// Set up mongoose connection
var mongoose = require('mongoose');
var dev_db_url = 'mongodb://someuser:password1@ds247410.mlab.com:47410/mongodbtutorial';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let entrants = 20;
let voters = 100;

// seedFuncs.seedEntries(entrants);
// seedFuncs.seedVoters(voters,entrants);

doSeeding = async function () {
    // return new Promise((resolve, reject) => {
        // console.log('before Ent');
        // seedFuncs.seedEntries(entrants);
        const Ent = await seedFuncs.seedEntries(entrants);
        console.log(Ent)
        const Vot = await seedFuncs.seedVoters(voters,entrants);
        console.log(Vot)
        db.close();
    // })
}


const promise = doSeeding().catch();

