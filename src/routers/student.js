const express = require('express')
const router = express.Router()

const session = require('../middleware/session')

const {
    profile,
    universityPartner,
    classroom
} = require('../api/student')

router.get('/api/student/', session, async (req, res) => {
    try {
        const student = await profile(req.token)

        res.json({
            success: true,
            payload: student
        })
    } catch (e) {
        res.status(401).json({
            error: {
                code: res.statusCode,
                message: e.message
            }
        })
    }
}).get('/api/student/classroom', session, async (req, res) => {
    try {
        const scheduleList = await classroom(req.token)

        res.json({
            success: true,
            payload: scheduleList
        })
    } catch (e) {
        res.status(401).json({
            error: {
                code: res.statusCode,
                message: e.message
            }
        })
    }
}).get('/api/student/partner', session, async (req, res) => {
    try {
        const partnerInfo = await universityPartner(req.token)

        res.json({
            success: true,
            payload: partnerInfo
        })
    } catch (e) {
        res.status(401).json({
            error: {
                code: res.statusCode,
                message: e.message
            }
        })
    }
})

module.exports = router