const rq = require('request-promise-native')

const authenticate = ({
    user,
    pass
}) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Documentation
            // https://backstage.forgerock.com/docs/openam/13/dev-guide/#about-openam-rest-api


            // OAuth2 Credentials (AM/OpenAM)
            // https://backstage.forgerock.com/knowledge/kb/article/a45882528
            const access_token = await rq.post({
                url: 'https://login.kaplan.com.sg/auth/oauth2/access_token',
                form: {
                    client_id: 'kaplan360',
                    client_secret: '#qhA7.["c87%#W<t',
                    grant_type: 'password',
                    username: user,
                    password: pass
                },
                gzip: true,
                json: true,
                simple: false
            })

            if (!access_token.id_token) {
                if (access_token.error === 'invalid_grant') {
                    return reject(new Error('Email or password is invalid, please retry.'))
                } else if (access_token.error === 'invalid_client') {
                    return reject(new Error('OAuth2 Client Credentials are invalid.'))
                }
            }

            // User endpoint (AM/OpenAM)
            // https://backstage.forgerock.com/knowledge/kb/book/b93241706
            const session_token = await rq.post({
                url: 'https://login.kaplan.com.sg/auth/json/authenticate?authIndexType=module&authIndexValue=mobileApp',
                headers: {
                    'Oidc_id_token': access_token.id_token
                },
                gzip: true,
                json: true,
                simple: true
            })

            const _id = await rq.get({
                url: 'https://profile-admin.kaplan.com.sg/openidm/info/login',
                headers: {
                    Iplanetdirectorypro: session_token.tokenId
                },
                gzip: true,
                json: true,
                simple: true
            })

            resolve({
                _id: _id.authorizationId.id,
                access_token: access_token.id_token,
                session_token: session_token.tokenId,
            })
        } catch (e) {
            reject(Error(e.message))
        }
    })
}

const refresh = ({
    jwt
}) => {
    return new Promise((resolve, reject) => {

    })
}
module.exports = {
    authenticate,
    refresh
}