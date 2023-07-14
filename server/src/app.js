const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const api = require('./routes/api');

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
// API v1
app.use('/v1', api);

// RH
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
});

module.exports = app;