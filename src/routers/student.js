'use strict';

const express = require('express');
const router = express.Router();

const session = require('../middleware/session');

const {getStudentProfile, getUniversityPartner, getClassroomList} = require('../utils/student');

router.get('/api/student/', session, async (req, res) => {
    try {
        const profileData = await getStudentProfile(req.token);

        res.json({
            success: true,
            student: profileData
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
        const classroomData = await getClassroomList(req.token);

        res.json({
            success: true,
            list: classroomData
            
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
        const partnerData = await getUniversityPartner(req.token);

        res.json({
            success: true,
            partner: partnerData
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