// npm libraries
import axios from 'axios'
import qs from 'qs'
import Boom from "@hapi/boom";

// local library
import {String} from '../../../lib'
import * as https from "https";
// Interfaces
import {ISessionAuthorization} from "../index";

export const GetSessionAuthorization = (username: string, password: string) => {
  return new Promise((resolve, reject) => {
    // Documentation
    // https://backstage.forgerock.com/docs/openam/13/dev-guide/#about-openam-rest-api

    // OAuth2 Credentials (AM/OpenAM)
    // https://backstage.forgerock.com/knowledge/kb/article/a45882528
    axios.post('https://login.kaplan.com.sg/auth/oauth2/access_token', qs.stringify({
      client_id: 'kaplan360',
      client_secret: '#qhA7.["c87%#W<t',
      grant_type: 'password',
      username,
      password
    }), {
      httpsAgent: new https.Agent({keepAlive: true}),
      responseType: 'json',
      timeout: 10000
    }).then(res => {
      if (!res.data.id_token) {
        if (res.data.error === 'invalid_grant') {
          return reject(Boom.unauthorized('There was an error with your E-Mail/Password combination. Please try again.'))
        } else if (res.data.error === 'invalid_client') {
          return reject(Boom.badImplementation('There was an issue with OAuth2 implementation of a gateway. Please try again in a few hours.'))
        }
      }

      resolve({
        expires_in: res.data.expires_in,
        value: res.data.id_token,
        type: 'jwt'
      } as ISessionAuthorization)
    }).catch(err => {
      if (err.message.includes('timeout'))
        return reject(Boom.gatewayTimeout(`${String.capitalize(err.message)}. Please try again.`));

      console.error(err.response);
      reject(Boom.badRequest(err.message));
    })
  })
};