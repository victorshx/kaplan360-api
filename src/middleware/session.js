'use strict';

const validator = require('validator');

const {
    refresh
} = require('../utils/session');

const session = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization;

        if (!bearerToken || bearerToken.indexOf('Bearer ') === -1) {
            throw new Error('Please provide a Bearer token.')

            // Date.now()/1000 to convert it to seconds as jwt.exp is in seconds, and trunc() to remove decimal point.
        } else if (JSON.parse(Buffer.from(bearerToken.replace('Bearer ', '').split('.')[1], 'base64').toString()).exp < Math.trunc(Date.now() / 1000)) {
            throw new Error('TokenExpiredException')
        }

        req.token = await refresh(bearerToken.replace('Bearer ', ''));
        return next()
    } catch (e) {
        res.status(401).json({
            code: res.statusCode,
            message: e.message
        })
    }
};

module.exports = session;