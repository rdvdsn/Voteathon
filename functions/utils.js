exports.getRandomInt = function(max){
    return Math.floor(Math.random() * Math.floor(max));
}


exports.generateVotingBlock= function(blockSize){
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