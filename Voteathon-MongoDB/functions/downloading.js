var Entry = require('../models/Entry');
var Voter = require('../models/Voter');

exports.downloadEntries = function() {
    console.log('In download Entries...');
    // functArray = []
    return new Promise((resolve,reject) => {
        Entry.find((err, items) => {
            if (err) {
                reject(err);
            } else {
                resolve(items);
            }
        });
    })
}; 