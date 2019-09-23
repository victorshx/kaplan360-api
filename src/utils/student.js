'use strict';

const rq = require('request-promise-native');

const profile = (Token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await rq.get({
                url: 'https://profile-admin.kaplan.com.sg/openidm/info/login',
                headers: {
                    Iplanetdirectorypro: Token
                },
                forever: true,
                gzip: true,
                json: true,
                simple: true
            });

            const userProfile = await rq.get({
                url: `https://profile-admin.kaplan.com.sg/openidm/managed/user/${user.authorizationId.id}`,
                headers: {
                    Iplanetdirectorypro: Token
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

const universityPartner = async (Token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const universityPartner = await rq.get({
                url: 'https://api-proxy-sg.au.cloudhub.io/onboarding-listCurrentPartners',
                headers: {
                    Token
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

const classroom = async (Token) => {
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

            resolve(classroomData.data)
        } catch (e) {
            reject(Error('Authorization Required.'))
        }
    })
};

module.exports = {
    profile,
    universityPartner,
    classroom
};