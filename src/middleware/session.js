const {
    refresh
} = require('../api/session')

const session = async (req, res, next) => {
    try {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
            throw new Error('Please provide an Authorization Bearer token.')

            // Date.now()/1000 to convert it to seconds as jwt.exp is in seconds, and trunc() to remove decimal point.
        } else if (JSON.parse(Buffer.from(req.headers.authorization.replace('Bearer ', '').split('.')[1], 'base64').toString()).exp < Math.trunc(Date.now() / 1000)) {
            throw new Error('The Bearer token has expired.')
        }

        const session_token = await refresh(req.headers.authorization.replace('Bearer ', ''))
        req.token = session_token

        return next()
    } catch (e) {
        res.status(401).json({
            code: res.statusCode,
            message: e.message
        })
    }
}

module.exports = session