const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

// Running mongoose connection ONCE with provided callback.
mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

// Error handling with mongoose
mongoose.connection.on('error', (error) => {
    console.error(error);
});

// Connect to MongoDB
async function mongoConnect() {
    // Connect mongoose to mongoDB with the URL; it returns a promise so 'await'. NO options needed after MONGO_URL with >= v6...
    await mongoose.connect(MONGO_URL);
};

// Disconnect from MongoDB
async function mongoDisconnect() {
    await mongoose.disconnect(MONGO_URL);
};

module.exports = {
    mongoConnect,
    mongoDisconnect
};