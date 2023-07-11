const fs = require('fs'); // file system module.
const path = require('path');
const { parse } = require('csv-parse');


// What is streaming and how do we deal with large data files in node?
    // Node.js stream API
        // All streams are emitted by the EventEmitter. We react to the events on the stream using the '.on' function.
        // Many things in node are streams. (HTTP servers / web / etc...).
        // 
const habitablePlanets =[];

// Filter out those planets that are habitable.
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
};

/* 
const promise = new Promise((resolve, reject) => {
    resolve(42);
})
promise.then((result) => {
    
});
const result = await promise;
*/

function loadPlanetsData () {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')) // outputs an array of <Buffer> (essentially bytes). Must parse from here.
        .pipe(parse({
            comment: '#',
            columns: true, // will return each row in our CSV file in a JS object with key value pairs.
        })) // pipe function connects a readable stream source to a writeable stream destination. kepler file is our source and the parse function is the destination for our pipe. (readableStream.pipe(writeableStream))
        .on('data', (data) => {
            if (isHabitablePlanet(data)){
            habitablePlanets.push(data);
            };
        })
        .on('error', (error) => {
            console.log(error)
            reject(error);
        })
        .on('end', () => {
            console.log(`${habitablePlanets.length} habitable planets found!`);
            resolve();
        });
    })
}

function getAllPlanets() {
    return habitablePlanets;
}

module.exports = {
    loadPlanetsData,
    getAllPlanets
};