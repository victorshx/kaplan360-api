'use strict';

const rq = require('request-promise-native');

const getAuthorizationToken = ({user, pass}) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Documentation
            // https://backstage.forgerock.com/docs/openam/13/dev-guide/#about-openam-rest-api

            // OAuth2 Credentials (AM/OpenAM)
            // https://backstage.forgerock.com/knowledge/kb/article/a45882528
            const oauth2 = await rq.post({
                url: 'https://login.kaplan.com.sg/auth/oauth2/access_token',
                form: {
                    client_id: 'kaplan360',
                    client_secret: '#qhA7.["c87%#W<t',
                    grant_type: 'password',
                    username: user,
                    password: pass
                },
                forever: true,
                gzip: true,
                json: true,
                simple: false
            });

            if (!oauth2.id_token) {
                if (oauth2.error === 'invalid_grant') {
                    return reject(new Error('Email or password is invalid.'))
                } else if (oauth2.error === 'invalid_client') {
                    return reject(new Error('OAuth2Exception'))
                }
            }

            resolve({
                jwt: oauth2.id_token
            })
        } catch (e) {
            reject(Error(e.message))
        }
    })
};

const getRefreshToken = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            // User endpoint (AM/OpenAM)
            // https://backstage.forgerock.com/knowledge/kb/book/b93241706
            const session_token = await rq.post({
                url: 'https://login.kaplan.com.sg/auth/json/authenticate?authIndexType=module&authIndexValue=mobileApp',
                headers: {
                    Oidc_id_token: token
                },
                forever: true,
                gzip: true,
                json: true,
                simple: false
            });

            if (!session_token.tokenId) {
                return reject(new Error('Authorization Required.'))
            }

            resolve(session_token.tokenId)
        } catch (e) {
            reject(Error(e.message))
        }
    })
};

module.exports = {
    getAuthorizationToken,
    getRefreshToken
};