const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');

const app = express();

// Allowing Cross-Origin-Requests from our frontend at PORT 3000. 
app.use(cors({
    origin: 'http://localhost:3000'
}));

// MORGAN middleware
app.use(morgan('dev'));
// .JSON Middleware - parse JSON from incoming requests
app.use(express.json());
// BUILD front on backend
app.use(express.static(path.join(__dirname, '..', 'public')));

// RH
app.use('/planets', planetsRouter);
app.use('/launches', launchesRouter);
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

module.exports = app;