const http = require('http');

// DOTENV to populate environment in all the files before we import them (especially mongo service).
require('dotenv').config();

const app = require('./app')
const { mongoConnect } = require('./services/mongo');
const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

async function startServer() {
    await mongoConnect();    
    await loadPlanetsData();
    await loadLaunchData();
    
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
};

startServer();
