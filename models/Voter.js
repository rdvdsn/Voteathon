var mongoose= require('mongoose');

var Schema=mongoose.Schema;

var voterSchema = new Schema({
        name: String,
        teamName: String,
        teamCategory: String,
        blockAssigned: Boolean,
        blockReturned: Boolean
});

var Voter = mongoose.model('Voter', voterSchema);

module.exports = Voter;