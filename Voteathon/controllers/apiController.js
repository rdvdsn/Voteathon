var VoterDB = require('../models/voterModel');
var EntryDB = require('../models/entrantModel');

var bodyParser = require('body-parser');

module.exports = function (app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    // now writethe specific url verb initiated functions

    // will want a get function eventually for retrieving the votes to be made
    // app.get('/api/todos/:uname', function(req, res) {
    //     Todos.find({ username: req.params.uname },
    //     function(err,todos) {
    //         if (err) throw err;

    //         res.send(todos);
    //     });
    // });

    // will need a post for participant registration
    app.post('/reg/voter', function(req, res) {
        console.log('post received')
    
        var newVoter = VoterDB({
            name: req.body.name,
            teamName: req.body.teamName,
            teamCategory: req.body.teamCategory,
            blockAssigned: false,
            blockReturned: false
        });
        console.log('Built the entry for VoterDB with name '+req.body.name);
        res.send(newVoter);
        console.log('res.send happened?');

        // this was in the UDEMY coursework as well as the create - why both?? what does .save do?
        // newVoter.save(function(err) {
        //     if (err) {
        //         console.log('in if err');
        //         throw err;
        //     }
            // res.send('Success');
            // console.log('in no err');
        // }); 
        VoterDB.create(newVoter, function(err) {
            if (err) throw err;
            // res.send('Success (create)');
               
        });
        
    });


    app.post('/submit/entry', function(req, res) {
        console.log('post received')
    
        var newEntry = EntryDB({
            teamName: req.body.teamName,
            teamCategory: req.body.teamCategory,
            entryLink: req.body.entryLink,
            timesViewed: 0,
            pointsAllocated: 0
        });
        console.log('Built the entry for EntryDB with team '+req.body.teamName);
        res.send(newEntry);
        console.log('res.send happened?');

 
        EntryDB.create(newEntry, function(err) {
            if (err) throw err;

            // "res.send" is throwing causing errors by looks of what happens when I comment it out
            // res.send('Success (create)');
               
        });
        
    });
    // will need a post for team registration???

    // will need a post for votes once we have votes

    // 

};