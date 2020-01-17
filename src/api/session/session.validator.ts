// npm libraries
import * as Joi from '@hapi/joi'

export const sessionAuthorizationParams = Joi.object({
  gateway: Joi
      .string()
      .valid('kaplan')
      .required()
}).label('Session Authorization Route Parameters');

export const sessionAuthorizationPayload = Joi.object({
  username: Joi
      .string()
      .trim()
      .example('CT0458796')
      .description('Username')
      .required(),
  password: Joi
      .string()
      .example('supersecurepassword')
      .description('Password')
      .required()
}).label('Session Authorization Payload');
