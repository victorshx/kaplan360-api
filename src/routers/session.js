'use strict';

const express = require('express');
const router = new express.Router();

const {authenticate} = require('../utils/session');

router.post('/api/session', async (req, res) => {
    try {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            throw new Error('Please provide an Authorization Basic header..')
        }

        const authorizationDecoded = Buffer.from(req.headers.authorization.replace('Basic ', ''), 'base64').toString().split(':');

        const tokens = await authenticate({
            user: authorizationDecoded[0],
            pass: authorizationDecoded[1]
        });

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
});

module.exports = router;