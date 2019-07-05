//Dependencies
const express = require('express')
const helmet = require('helmet')

// Express.js
const app = express()
app.use(helmet())
app.set('json spaces', 2)
const port = process.env.PORT || 8888

// Global middleware
app.use((req, res, next) => {
    // Keep-alive
    res.setHeader('Connection', 'keep-alive')

    // No-cache
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
})

// Routers
const sessionRouter = require('./routers/session')
const studentRouter = require('./routers/student')
app.use(sessionRouter)
app.use(studentRouter)

app.all('*', (req, res) => {
    res.send('Go away.')
})
app.listen(port, () => {
    console.log('Server is listening at port ' + port)
})