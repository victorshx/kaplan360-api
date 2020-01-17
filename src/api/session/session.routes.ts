// npm libraries
import * as Hapi from '@hapi/hapi'
// Controller
import * as SessionController from './session.controller'
import * as SessionSchema from './session.schema'
// Validator
import * as SessionValidator from './session.validator'
// Models
import {boom} from '../../models'

export default async function (server: Hapi.Server) {
  // Agent Directory Query route
  server.route({
    method: 'POST',
    path: '/api/{gateway}/session/authorize',
    options: {
      handler: SessionController.GetSessionAuthorization,
      tags: ['api', 'session'],
      description: 'Session Authorization API',
      notes: 'Get Authorization token by authorizing credentials',
      plugins: {
        "hapi-swagger": {
          responses: {
            200: {
              description: "Successful authorization",
              schema: SessionSchema.sessionAuthorizationResponseModel
            },
            400: {
              description: "Invalid request input",
              schema: boom.badRequestModel
            },
            408: {
              description: 'Client request timeout',
              schema: boom.clientTimeoutModel
            },
            500: {
              description: "Invalid response payload",
              schema: boom.badResponseModel
            },
            503: {
              description: 'Provider service unavailable',
              schema: boom.serviceUnavailableModel
            },
            504: {
              description: 'Provider service timeout',
              schema: boom.gatewayTimeoutModel
            }
          }
        }
      },
      validate: {
        params: SessionValidator.sessionAuthorizationParams,
        payload: SessionValidator.sessionAuthorizationPayload,
        options: {
          allowUnknown: false
        }
      },
      response: {
        sample: 100,
        schema: SessionSchema.sessionAuthorizationResponseModel,
        failAction: async (request, h, err) => {
          console.error(err);
          throw err;
        }
      }
    }
  });
}