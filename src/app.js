'use strict';

// Dependencies
const express = require('express');
const helmet = require('helmet');
const pretty = require('express-prettify');

// Express.js
const app = express();
app.use(helmet());
app.use(pretty({
    query: 'pretty'
}));
const port = process.env.PORT || 8888;

// Global middleware
app.use((req, res, next) => {
    // No-cache
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

// Routers
const sessionRouter = require('./routers/session');
const studentRouter = require('./routers/student');
app.use(sessionRouter);
app.use(studentRouter);

app.get('*', (req, res) => {
    res.status(404).json({
        error: res.statusCode,
        message: '404 Not Found'
    })
});

app.listen(port, () => {
    console.log('Server is listening at port ' + port)
});