const { getAllPlanets } = require('../../models/planets.model');

async function httpGetAllPlanets (req,res) {
    return res.status(200).json( await getAllPlanets()); // return will only set the response once to avoid errors (ie CANNOT SET HEADERS ONCE THEY ARE SET).
};

module.exports = {
    httpGetAllPlanets,
};