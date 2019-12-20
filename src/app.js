'use strict';

// Dependencies
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const pretty = require('express-prettify');

// Express.js
const app = express();
app.use(helmet());
app.use(helmet.noCache());
app.use(compression());
app.use(pretty({
    query: 'pretty'
}));
const PORT = process.env.PORT || 8888;

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

app.listen(PORT, () => {
    console.log('Server is listening at port ' + PORT)
});