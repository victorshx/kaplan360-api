'use strict';

const rq = require('request-promise-native');

const getStudentProfile = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await rq.get({
                url: 'https://profile-admin.kaplan.com.sg/openidm/info/login',
                headers: {
                    Iplanetdirectorypro: token
                },
                forever: true,
                gzip: true,
                json: true,
                simple: true
            });

            const userProfile = await rq.get({
                url: `https://profile-admin.kaplan.com.sg/openidm/managed/user/${user.authorizationId.id}`,
                headers: {
                    Iplanetdirectorypro: token
                },
                forever: true,
                gzip: true,
                json: true,
                simple: true
            });

            resolve(userProfile)
        } catch (e) {
            reject(Error('Authorization Required.'))
        }
    })
};

const getUniversityPartner = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const universityPartner = await rq.get({
                url: 'https://api-proxy-sg.au.cloudhub.io/onboarding-listCurrentPartners',
                headers: {
                    Token: token
                },
                forever: true,
                gzip: true,
                json: true,
                simple: true
            });

            if (universityPartner.data.length === 0) {
                return resolve('You are not enrolled in any university partner.')
            }

            const universityPartnerObject = {...universityPartner.data[0]};

            resolve(universityPartnerObject)
        } catch (e) {
            console.log(e);
            reject(Error('Authorization Required.'))
        }
    })
};

const getClassroomList = async (Token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const classroomData = await rq.get({
                url: 'https://api-proxy-sg.au.cloudhub.io/studentclassroom',
                headers: {
                    Token
                },
                forever: true,
                gzip: true,
                json: true,
                simple: true
            });

            let scheduleArray = [];

            for (let i = 0; i < classroomData.data.length; i++) {
                scheduleArray.push(classroomData.data[i])
            }

            resolve(scheduleArray)
        } catch (e) {
            reject(Error('Authorization Required.'))
        }
    })
};

module.exports = {
    getStudentProfile,
    getUniversityPartner,
    getClassroomList
};