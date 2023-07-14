const axios = require('axios');

const launchesDatabase = require('./launches.mongo');
const planets = require('./planets.mongo');

// const launches = new Map();

// let latestFlightNumber = 100;
const DEFAULT_FLIGHT_NUMBER = 100;

// const launch = {
//     flightNumber: 100, // flight_number in SpaceX API
//     mission: 'Kepler Exploration X', // name in SpaceX API
//     rocket: 'Explorer IS1', // rocket.name in SpaceX API
//     launchDate: new Date('December 27, 2030'), // date_local
//     target: 'Kepler-442 b', // not applicable
//     customers: ['ZTM', 'NASA'], // payload.customers for each payload
//     upcoming: true, // upcoming
//     success: true // success
// };

// saveLaunch(launch)

// launches.set(launch.flightNumber, launch);

// LOAD launches data SpaceX
const SPACEX_API_URL = 'https://api.spacexdata.com/v5/launches/query'

async function populateLaunches() {
    console.log('Loading SpaceX launches');
    const response = await axios.post(SPACEX_API_URL, 
        {
            query: {},
            options: {
                pagination: false,
                populate: [
                {
                    path: 'rocket',
                    select: {
                        name: 1
                    }
                },
                {
                    path: 'payloads',
                    select: {
                        customers: 1
                    }
                }
                ]
            }
        }
    );
    if (response.status !== 200) {
        console.log('Problem downloading launch data.');
        throw new Error('Launch data download failed.')
    };

    const launchDocs = response.data.docs;
    for (const launchDoc of launchDocs) {
        const payloads =  launchDoc['payloads'];
        const customers = payloads.flatMap((payload) => {
            return payload['customers']
        });

        const launch = {
            flightNumber: launchDoc['flight_number'],
            mission: launchDoc['name'],
            rocket: launchDoc['rocket']['name'],
            launchDate: launchDoc['date_local'],
            upcoming: launchDoc['upcoming'],
            success: launchDoc['success'],
            customers
        };

        console.log(`${launch.flightNumber} ${launch.mission} customers ${launch.customers}`);

        //TODO: populate launches
        await saveLaunch(launch);
    };
};

async function loadLaunchData() {
    const firstLaunch = await findLaunch({
        flightNumber: 1,
        rocket: 'Falcon 1',
        mission: 'FalconSat'
    });
    if (firstLaunch) {
        console.log('Launch Data already loaded.');
    } else {
        await populateLaunches();
    }
    
};

// GET launch that matches some criteria
async function findLaunch(filter) {
    return await launchesDatabase.findOne(filter);
};

// CHECK if a launch exists by ID.
async function existsLaunchWithId(launchId) {
    return await findLaunch({
        flightNumber: launchId,
    });
};

// GET latest flight number
async function getLatestFlightNumber() {
    const latestLaunch = await launchesDatabase.findOne().sort('-flightNumber'); // - in front of string sorts in descending order.

    if (!latestLaunch) {
      return DEFAULT_FLIGHT_NUMBER;
    };

    return latestLaunch.flightNumber;
};

// GET launches
async function getAllLaunches(skip, limit) {
    // return Array.from(launches.values());
    // {} will return all launches in first parameter. Excluding v & id. 
    return await launchesDatabase.find({}, {
        '__v': 0,
        '_id': 0
    }).sort({ flightNumber: 1 }).skip(skip).limit(limit);
};

// Save launch in mongoDB
async function saveLaunch(launch) {
    await launchesDatabase.findOneAndUpdate({
        flightNumber: launch.flightNumber
    }, launch, {
        upsert: true
    });
};

// POST launch
// function addNewLaunch(launch) {
//     latestFlightNumber++;
//     launches.set(
//         latestFlightNumber, 
//         Object.assign(launch, {                 // Object.assign will set the new value of a launch's flightNumber with the latestFlightNumber variable.
//             success: true,
//             upcoming: true,
//             customers: ['Zero to Mastery', 'NASA'],
//             flightNumber: latestFlightNumber
//         })
//     );
// };

// POST launch in mongoDB
async function scheduleNewLaunch(launch) {

    const planet = await planets.findOne({
        keplerName: launch.target
    });

    if (!planet) {
        throw new Error('No matching habitable planet found.')
    };

    const newFlightNumber = await getLatestFlightNumber() + 1

    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ['Zero to Mastery', 'NASA'],
        flightNumber: newFlightNumber
    });

    await saveLaunch(newLaunch);
};

// DELETE launch by id
async function abortLaunchById(launchId) {
    // const aborted = launches.get(launchId);
    // aborted.upcoming = false;
    // aborted.success = false;
    // return aborted;

    const aborted =  await launchesDatabase.updateOne({
        flightNumber: launchId
    }, {
        upcoming: false,
        success: false
    });
    console.log('aborted', aborted)
    return aborted.modifiedCount === 1;
};

module.exports = {
    loadLaunchData,
    existsLaunchWithId,
    getAllLaunches,
    abortLaunchById,
    scheduleNewLaunch
};
