const express = require('express')
const router = new express.Router()

const rq = require('request-promise-native')

const {
    authenticate,
    refresh
} = require('../utils/session')

router.post('/api/session/authenticate', async (req, res) => {
    try {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            throw new Error('Please provide an Authorization Basic header..')
        }

        const authorizationDecoded = Buffer.from(req.headers.authorization.replace('Basic ', ''), 'base64').toString().split(':')

        const tokens = await authenticate({
            user: authorizationDecoded[0],
            pass: authorizationDecoded[1]
        })

        res.json({
            success: true,
            payload: tokens
        })
    } catch (e) {
        res.status(401).json({
            error: {
                code: res.statusCode,
                message: e.message
            }
        })
    }
}).post('/api/session/refresh', async (req, res) => {
    try {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
            throw new Error('Please provide an Authorization Bearer token.')
            // Date.now()/1000 to convert it to seconds as jwt.exp is in seconds, and trunc() to remove decimal point.
        } else if (JSON.parse(Buffer.from(req.headers.authorization.replace('Bearer ', '').split('.')[1], 'base64').toString()).exp < Math.trunc(Date.now() / 1000)) {
            throw new Error('The Bearer token provided has expired.')
        }

        const session_token = await refresh({
            jwt: req.headers.authorization.replace('Bearer ', '')
        })

        res.json({
            success: true,
            payload: session_token
        })
    } catch (e) {
        res.status(401).json({
            code: res.statusCode,
            message: e.message
        })
    }
})

module.exports = router