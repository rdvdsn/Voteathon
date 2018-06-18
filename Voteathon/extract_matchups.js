const fs = require('fs');
const stringify = require('csv-stringify');
// const utils = require('./utils');


// Set up mongoose connection
// var mongoose = require('mongoose');
// var dev_db_url = 'mongodb://someuser:password1@ds247410.mlab.com:47410/mongodbtutorial';
// var mongoDB = process.env.MONGODB_URI || dev_db_url;
// mongoose.connect(mongoDB);
// mongoose.Promise = global.Promise;
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const Entrant = require('./ClEntrant').Entrant;
const Matchup = require('./ClMatchup').Matchup;
// const Entries = require('./models/entrantModel');

var matchups = [];

//////////////////////////////////////////////////////////////
// put functions into separate files - potentially grouped by functions



// make more meaningful names?
function gen_ent_pop(entrantsCount){
    let array = [];
    let cat ='Play';
    let onethirds = Math.floor(entrantsCount/2);
    let twothirds = Math.floor((2*entrantsCount)/3);
    for (wp = 0; wp < entrantsCount; wp++) {
        if (wp >= twothirds ) {
            cat = 'Votes'
        } 
        else if (wp >= onethirds) {
            cat = 'Work';
        }
        // var to_load = new Entries(
        //     {
        //         id: wp,
        //         teamName: `r${wp}`,
        //         teamCategory: cat,
        //         entryLink: `link${wp}`,
        //         timesViewed: 0,
        //         pointsAllocated: 0 
        //     }
        // );
        var to_load = new Entrant(wp, `r${wp}`, `link${wp}`);
        // Entries.create(to_load,function(err){
        //     if (err) throw err;
        //     cnosole.log('call back done?');
        //     db.close();
        // });
        array.push(to_load);
    }

    // console.log(array);
    return array;
};

function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function dedupCatArray(inArray){
    let distinct= [];
    for (chkArray = 0; chkArray < inArray.length; chkArray ++) {
        if (!distinct.includes(inArray[chkArray].category)) {
            distinct.push(inArray[chkArray].category)
        }
    }
    // console.log(distinct);
    return distinct;
}
  
Array.prototype.hasMin = function(attrib) {
    return this.reduce(function(prev,curr) {
        return prev[attrib] < curr[attrib] ? prev : curr ;

    });
}

function gen_block(blockSize){
    unranked_group = [];
    let id= -1;
    item_ids =[];
    let lowViews = [];

    let lowest_views=catPop.hasMin('viewed_times').viewed_times;
    // console.log(lowest_views);
    while( lowViews.length < 6) {
        lowViews = catPop.filter(item => item.viewed_times <= lowest_views);
            lowest_views++;
        }
    // console.log(lowViews);

    while (item_ids.length < blockSize){
            array_id = getRandomInt(lowViews.length);
            // console.log(id);
        if (item_ids.includes(array_id)) {
            // console.log('id already present');
        } else {
            item_ids.push(array_id);
            unranked_group.push(lowViews[array_id]);
            catPop[lowViews[array_id].catID].viewed_times ++;
            whole_pop[lowViews[array_id].id].viewed_times ++;
        }
        // console.log(id);
    }
    // console.log('THE UNRANKED GROUP IS:');
    // console.log( unranked_group);
    return unranked_group;
};

// TODO: write methods to receive new ranking and decipher them


function alphabeticalTruth(groupToRank){
    let abcArray = groupToRank.sort(function(a,b) {return (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0);} );
    // console.log(abcArray);
    if (Math.random() < 0.12) {
        var pos1= getRandomInt(abcArray.length);
        var pos2 = getRandomInt(abcArray.length);
        if (!pos1===pos2) {
            var temp=abcArray[pos1];
            abcArray[pos1]=abcArray[pos2];
            abcArray[pos2]=temp;
        }
    }
    else {
        //nothing
    };

    return abcArray;
}


function abcExtract_matchup_results(ranked /*, whole_pop, matchups*/){
    // if (!matchups) {
    //     matchups = [];
    // }
    for (i=0; i < ranked.length ; i++ ) {

        whole_pop[ranked[i].id].points_awarded = whole_pop[ranked[i].id].points_awarded + (ranked.length - i);

        for (j=i+1; j < ranked.length; j++ ) {

        const matchupToLoad = new Matchup(ranked[i].category, ranked[i].name, ranked[j].name);
        // console.log(matchup);
        matchups.push(matchupToLoad);
        // console.log(matchups);
        // console.log(matchups.length);
        }
    }
    return matchups;
};



whole_pop=gen_ent_pop(100);
// whole_pop=utils.generateSeedData([
//     {
//         label: 'Play',
//         size: 30
//     },
//     {
//         label: 'Work',
//         size: 20
//     },
//     {
//         label: 'Chill',
//         size: 40
//     }
// ]);
// console.log(whole_pop);

// var catPop=[];
// console.log('here now...');

// TODO: make a distinct array of cats
//       loop through distinct and create voter sets.
//       potential for some smart logic on available voters and how to split them?
////////////////////////////////////////////////////////////////////////////////
//      could be the case that we define this from the user/team registration that will 
//      be closed and final by point of entries to vote on.



uniqueCats = dedupCatArray(whole_pop);
for (catIter = 0; catIter < uniqueCats.length; catIter++) {
    var catPop = whole_pop.filter(  
        function filterByCat(item) {
            if (item.category === uniqueCats[catIter]) {
              return true;
            } 
            return false; 
        });

    for (addCatID = 0; addCatID < catPop.length; addCatID++) {
        catPop[addCatID].catID = addCatID;
    }

    for (voteIter=0; voteIter < 200; voteIter ++) {
    
        let unrankedBlock = gen_block(6, catPop);
        
        // naive_rerank();
        let voterReturn = alphabeticalTruth(unrankedBlock);

        // extract_matchup_results(whole_pop,  matchups);
        // TODO: initiate matchups in a more "correct" way
        // TODO: all of this will become a mongoDB anyway...
        
        abcExtract_matchup_results(voterReturn/*, whole_pop, matchups*/);
        console.log("catIter: " + catIter + ", voteIter: " +voteIter)
    }
}


// CSV dump to look at results
// also dumping the matchup file for potential use in Python Script optimising ranking via network created by judges

'use strict';

function toCSV(){
    stringify(matchups, function(err, made_csv) {
        // console.log('got this far?');

        // console.log(made_csv);
        fs.writeFile('matchups.csv', made_csv, 'utf8', function(err) {
        if (err) {
        //   console.log('Some error occured - file either not saved or corrupted file saved.');
        } else {
        //   console.log('It\'s saved!');
        }
    });
    });


    stringify(whole_pop, function(err, made_csv) {
        // console.log('got this far?');

        // console.log(made_csv);
        fs.writeFile('whole_pop.csv', made_csv, 'utf8', function(err) {
        if (err) {
        //   console.log('Some error occured - file either not saved or corrupted file saved.');
        } else {
        //   console.log('It\'s saved!');
        }
    });
    });
}
toCSV();