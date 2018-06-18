var mongoose= require('mongoose');

var Schema=mongoose.Schema;

var voterSchema = new Schema({
        name: String,
        teamName: String,
        teamCategory: String,
        blockAssigned: Boolean,
        blockReturned: Boolean
});

var VoterDB = mongoose.model('VoterDB', voterSchema, 'VoterDB');

module.exports = VoterDB;