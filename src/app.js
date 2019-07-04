//Dependencies
const express = require('express')
const helmet = require('helmet')

// Express.js
const app = express()
app.use(helmet())
app.set('json spaces', 2)
const port = process.env.PORT || 8888

// No-cache middleware
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
})

// Routers
const sessionRouter = require('./routers/session')
app.use(sessionRouter)

app.all('*', (req, res) => {
    res.send('Go away.')
})
app.listen(port, () => {
    console.log('Server is listening at port ' + port)
})