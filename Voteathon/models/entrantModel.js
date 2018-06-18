var mongoose= require('mongoose');

var Schema=mongoose.Schema;

var entrantSchema = new Schema({
        id: Number,
        teamName: String,
        teamCategory: String,
        entryLink: String,
        timesViewed: Number,
        pointsAllocated: Number
});

var Entries = mongoose.model('Entries', entrantSchema);

module.exports = Entries;