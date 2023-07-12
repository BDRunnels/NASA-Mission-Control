const fs = require('fs'); // file system module.
const path = require('path');
const { parse } = require('csv-parse');

const planets = require('./planets.mongo');


// What is streaming and how do we deal with large data files in node?
    // Node.js stream API
        // All streams are emitted by the EventEmitter. We react to the events on the stream using the '.on' function.
        // Many things in node are streams. (HTTP servers / web / etc...).

// const habitablePlanets =[];

// Filter out those planets that are habitable.
function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' 
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
};

function loadPlanetsData () {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', '..', 'data', 'kepler_data.csv')) // outputs an array of <Buffer> (essentially bytes). Must parse from here.
        .pipe(parse({
            comment: '#',
            columns: true, // will return each row in our CSV file in a JS object with key value pairs.
        })) // pipe function connects a readable stream source to a writeable stream destination. kepler file is our source and the parse function is the destination for our pipe. (readableStream.pipe(writeableStream))
        .on('data', async (data) => {
            if (isHabitablePlanet(data)){
            // habitablePlanets.push(data);
                // TODO: replace below create with insert + update = upsert. So they are only added if they don't already exist in the DB.
                savePlanet(data);
            };
        })
        .on('error', (error) => {
            console.log(error)
            reject(error);
        })
        .on('end', async () => {
            const countPlanetsFound = (await getAllPlanets()).length
            console.log(`${countPlanetsFound} habitable planets found!`);
            resolve();
        });
    })
}

async function getAllPlanets() {
    // 2nd parameter will exclude those k-v pairs from the results.
    return await planets.find({}, {
        '__v': 0,
        '_id': 0
    });
};

async function savePlanet (planet) {
    try {
        await planets.updateOne({
            keplerName: planet.kepler_name
        }, {
            keplerName: planet.kepler_name
        }, {
            upsert: true,
        });
    } catch (error) {
        console.error(`Could not save a planet ${error}`)
    }    
};

module.exports = {
    loadPlanetsData,
    getAllPlanets
};