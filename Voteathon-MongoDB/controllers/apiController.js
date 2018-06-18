/* bring in the classes required*/
var Voter = require('../models/Voter');
var Entry = require('../models/Entry');


exports.test = function(req, res) {
    res.send('Greetings!!');
};

exports.addVoter = function(req, res) {
    let to_load = new Voter(
        {
            name: req.body.name,
            teamName: req.body.teamName,
            teamCategory: req.body.teamCategory,
            blockAssigned: false,
            blockReturned: false
        }
    );
    Voter.create(to_load, function(err){
        if (err) {
            return next(err)
        }
        res.send('Voter Successfully Added!')
    });

};

exports.addEntry = function(req, res) {
    to_load = new Entry(
        {
            id: req.body.id,
            teamName: req.body.teamName,
            teamCategory: req.body.teamCategory,
            entryLink: req.body.entryLink,
            timesViewed: 0,
            pointsAllocated: 0
        }
    );
    Entry.create(to_load, function(err){
        if (err){
            return next(err)
        }
        res.send('Entry Successfully Added!')
    });
};