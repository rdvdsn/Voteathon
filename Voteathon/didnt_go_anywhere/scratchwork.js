const fs = require('fs');
const csvWriter = require('csv-write-stream');
var stringify = require('csv-stringify');



var whole_pop = [];
var matchups = [];
var abcMatchups = [];
// var unranked_group = [];
var item_ids =[];
// var rankedArray= [];
var lowest_views= 0;


class entrant {
    constructor(id, name, link, category){
        this.id = id;
        this.name = name;
        this.link = link;
        this.category = category;
        this.viewed_times = 0;
        this.points_awarded = 0;
    }
}


function gen_entrant_pop(entrantsCount){
    let array = [];
    let cat ='Play';
    for (wp = 0; wp < entrantsCount; wp++) {
        if (wp >= (entrantsCount/2) ){
            cat = 'Work';
        }
        const to_load = new entrant(wp, 'r'+ wp, 'link' + wp, cat);
        array.push(to_load);
    }

    console.log(array);
    return array;
};


function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}


  
function filterByViews(item) {
    if (item.viewed_times <= lowest_views) {
      return true;
    } 
    return false; 
}
  
Array.prototype.hasMin = function(attrib) {
    return this.reduce(function(prev,curr) {
        return prev[attrib] < curr[attrib] ? prev : curr ;

    });
}

function gen_block(blockSize, source_pop){
    // TODO: make more black box - y
    // params in and return a thing.
    unranked_group = [];
    var id= -1;
    item_ids =[];
    var lowViews = [];

    // var tryfilter=source_pop.filter(viewed_times => viewed_times > 0);
    // console.log(tryfilter);
    lowest_views=source_pop.hasMin('viewed_times').viewed_times;
    // console.log(lowest_views);
    while( lowViews.length < 6) {
        lowViews = source_pop.filter(filterByViews);
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
            source_pop[lowViews[array_id].id].viewed_times ++;
        }
        // console.log(id);
    }
    // console.log('THE UNRANKED GROUP IS:');
    // console.log( unranked_group);
    return unranked_group;
};

// TODO: write methods to receive new ranking and decipher them

function naive_rerank() {
    rankedArray = [];
    // console.log(unranked_group); 
    // doing a simple false ranking for now
    for (rr = 0; rr < unranked_group.length; rr ++){
        var shift2 = rr+2;
        // console.log('rankedArray[' + rr + '] = unranked_group[(' + (rr2 % unranked_group.length) + '];');

        rankedArray[rr] = unranked_group[(shift2) % unranked_group.length];

    }
    // console.log('THE RANKED GROUP IS:');
    // console.log(rankedArray); 
    return rankedArray;
};

function alphabeticalTruth(groupToRank){
    // abcArray = unranked_group.sort('id');
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


function abcExtract_matchup_results(ranked, whole_pop, matchups){
    for (i=0; i < ranked.length ; i++ ) {

        whole_pop[ranked[i].id].points_awarded = whole_pop[ranked[i].id].points_awarded + (ranked.length - i);

        for (j=i+1; j < ranked.length; j++ ) {

        matchup = {entrant1: ranked[i].name ,entrant2 : ranked[j].name, ent1_wins: true};
        // console.log(matchup);
        matchups.push(matchup);
        // console.log(matchups);
        // console.log(matchups.length);
        }
    }
};



function extract_matchup_results(whole_pop, matchups){
    for (i=0; i < rankedArray.length ; i++ ) {

        whole_pop[rankedArray[i].id].points_awarded = whole_pop[rankedArray[i].id].points_awarded + (rankedArray.length - i);

        for (j=i+1; j < rankedArray.length; j++ ) {

        matchup = {entrant1: rankedArray[i].name ,entrant2 : rankedArray[j].name, ent1_wins: true};
        // console.log(matchup);
        matchups.push(matchup);
        // console.log(matchups);
        // console.log(matchups.length);
        }
    }
};
// console.log('THE SCORED ENTRANTS DATASET IS:');
// console.log(whole_pop);

// console.log('THE MATCHUP DATASET IS:');
// console.log(matchups);

whole_pop=gen_entrant_pop(100);

rdvar0 = stringify(whole_pop, function(err, made_csv) {
    console.log('got this far?');

    // console.log(made_csv);
    fs.writeFile('whole_pop1.csv', made_csv, 'utf8', function(err) {
    if (err) {
    //   console.log('Some error occured - file either not saved or corrupted file saved.');
    } else {
    //   console.log('It\'s saved!');
    }
  });
});
// console.log(whole_pop);
console.log('here now...');
catPop = whole_pop.filter(  
    function filterByViews(item) {
        if (item.category === 'Play') {
          return true;
        } 
        return false; 
    });

for (iter=0; iter < 200; iter ++) {
 

    let unrankedBlock = gen_block(6, catPop);
    
    // naive_rerank();
    let voterReturn=alphabeticalTruth(unrankedBlock);

    // extract_matchup_results(whole_pop,  matchups);
    abcExtract_matchup_results(voterReturn, whole_pop, matchups);

}


// CSV dump to look at results
// also dumping the matchup file for potential use in Python Script optimising ranking via network created by judges

'use strict';

rdvar = stringify(matchups, function(err, made_csv) {
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


rdvar2 = stringify(whole_pop, function(err, made_csv) {
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
