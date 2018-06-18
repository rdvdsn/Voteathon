const Entrant = require('./ClEntrant').Entrant;

function generateSeedData(configArray = null) {
    // why does this work with .push() if it is constant??
    let generatedData = [];

    if (configArray) {
        for (let i=0; i < configArray.length; i++){
            for (let j=0; j < configArray[i].size; j ++) {
                generatedData.push(new Entrant(`${i}-${j}`, `r${i}`, configArray[i].label));

            }
        }
    }
    
    if (!configArray ) {
    console.error('message - empty array');
    }
    return generatedData;
}

module.exports = {
    generateSeedData
}

