'use strict';

const fs = require('fs');
const {promisify} = require('util');
const Turtle = require('./turtle.class');

if (process.argv.length !== 4) {
    console.error('ERROR - Exactly two file arguments are required e.g "node minefield.js settings.json moves.json"');
    process.exit();
}

// assign the names of the 2 input files
const settingsFile = process.argv[2];
const movesFile = process.argv[3];

// convert readFile() to the Promise-based function readFileAsync()
const readFileAsync = promisify(fs.readFile);

(async function(){

    let settings;
    let movesObj;
    let settingsText;
    let movesText;
    let result;

    // Read the 2 input files asynchronously
    try {            
            [settingsText, movesText] = await Promise.all(
            [readFileAsync(settingsFile, 'utf-8'), 
            readFileAsync(movesFile, 'utf-8')]);
    }
    catch (error) {
            console.error(`ERROR - FILE READ - ${error.message}`);
            process.exit();
    }

    // console.log(`Settings are ${settingsText}`);
    // console.log(`Moves are ${movesText}`);

    settings = JSON.parse(settingsText);
    movesObj = JSON.parse(movesText);

    /* 
    Check that the console command listed the input files in the recommended order. In 
    case of reverse order, swap the order of the arguments in the call to main(). Further 
    checks on the integrity of the input data would have been added with 
    more development time. 
    */
    if ( settings.fileID == "settings" && movesObj.fileID == "moves" ){
        main(settings, movesObj );
    }
    
    else if ( settings.fileID == "moves" && movesObj.fileID == "settings" ){
        main(movesObj, settings);
    }

    else {
        console.error('ERROR - Input files are missing valid identifiers');
    }

})();

// proceed with playing the game and outputting the result
function main(settings, movesObj){

    let turtle = new Turtle();

    let result = turtle.playGame(settings, movesObj);

    console.log(`${result}`);
}



