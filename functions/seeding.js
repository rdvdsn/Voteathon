var Entry = require('../models/Entry');
var Voter = require('../models/Voter');


exports.seedEntries = function(entrantsCount) {
    console.log('in seedEntries');
    return new Promise(resolve => {
    let arrayOfDocs = [];
    let cat ='Play';
    let onethirds = Math.floor(entrantsCount/2);
    let twothirds = Math.floor((2*entrantsCount)/3);
    for (ep = 0; ep < entrantsCount; ep++) {
        if (ep >= twothirds ) {
            cat = 'Votes'
        } 
        else if (ep >= onethirds) {
            cat = 'Work';
        }
        
        let to_load = new Entry(
            {
                id: ep,
                teamName: `String${ep}`,
                teamCategory: cat,
                entryLink: `link${ep}`,
                timesViewed: 0,
                pointsAllocated: 0
            }
        );

        arrayOfDocs.push(to_load);
    }
    Entry.insertMany(arrayOfDocs, function(err){
        if (err) {
            console.log('error happened');
        } else {
            resolve('Seed Entries pushed to MongoDB');
        }
    });
    })

};

exports.seedVoters = function(votersCount, entrantsCount){
    console.log('in seedVoters');
    return new Promise( resolve => {
        let arrayOfDocs = [];
        let cat ='Play';
        let onethirds = Math.floor(votersCount/2);
        let twothirds = Math.floor((2*votersCount)/3);

        vpe = votersCount/entrantsCount;

        for (vp = 0; vp < votersCount; vp++) {
            teamNameSuffix = Math.ceil(vp/vpe);

            if (vp >= twothirds ) {
                cat = 'Votes'
            } 
            else if (vp >= onethirds) {
                cat = 'Work';
            }
            let to_load = new Voter(
                {
                    
                    name: `Voter ${vp}`,
                    teamName: `String${teamNameSuffix}`,
                    teamCategory: cat,
                    blockAssigned: false,
                    blockReturned: false
                
                }
            );

            arrayOfDocs.push(to_load);
        }
        Voter.insertMany(arrayOfDocs, function(err) {
            if(err) {
                console.log('error happened');
            } else {
                resolve('Seed Voters pushed to MongoDB');
            }
        });
    });

};