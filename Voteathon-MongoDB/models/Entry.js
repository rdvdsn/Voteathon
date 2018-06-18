var mongoose= require('mongoose');

var Schema=mongoose.Schema;

var EntrySchema = new Schema({
        id: Number,
        teamName: String,
        teamCategory: String,
        entryLink: String,
        timesViewed: Number,
        pointsAllocated: Number
});

var Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry;