'use strict';

const express = require('express');
const router = new express.Router();

const {getAuthorizationToken} = require('../utils/session');

router.post('/api/session', async (req, res) => {
    try {
        if (!req.query.username || !req.query.password) {
            throw new Error('Please provide username and password query parameters!')
        }

        const token = await getAuthorizationToken({
            user: req.query.username,
            pass: req.query.password
        });

        res.json({
            success: true,
            token
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