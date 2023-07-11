const { getAllPlanets } = require('../../models/planets.model');

function httpGetAllPlanets (req,res) {
    return res.status(200).json(getAllPlanets()); // return will only set the response once to avoid errors (ie CANNOT SET HEADERS ONCE THEY ARE SET).
};

module.exports = {
    httpGetAllPlanets,
};