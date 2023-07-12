const http = require('http');
const mongoose = require('mongoose');

const app = require('./app')

const { loadPlanetsData } = require('./models/planets.model');

const server = http.createServer(app);

const PORT = process.env.PORT || 8000;

const MONGO_URL = 'mongodb+srv://nasa-api:NDrtAAjGxE8UJuPC@nasacluster.jrzw3bk.mongodb.net/nasa?retryWrites=true&w=majority';

// Running mongoose connection ONCE with provided callback.
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

// Error handling with mongoose
mongoose.connection.on('error', (error) => {
    console.error(error);
});

async function startServer() {
    // Connect mongoose to mongoDB with the URL; it returns a promise so 'await'. NO options needed after MONGO_URL with >= v6...
    await mongoose.connect(MONGO_URL);

    await loadPlanetsData();
    
    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`);
    });
};

startServer();
