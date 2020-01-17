import * as Joi from "@hapi/joi";

export const badRequestModel = Joi.object({
  statusCode: Joi
      .number()
      .integer()
      .valid('400')
      .required(),
  error: Joi
      .string()
      .valid('Bad Request')
      .required(),
  message: Joi
      .string()
      .example('Invalid request input')
      .required()
}).description('400 Bad Request')
    .label('Bad Request Model');

export const unauthorizedModel = Joi.object({
  statusCode: Joi
      .number()
      .valid(401)
      .required(),
  error: Joi
      .string()
      .valid('Unauthorized')
      .required(),
  message: Joi
      .string()
      .example('There was an error with your Username/Password combination. Please try again.')
      .required()
}).description('401 Unauthorized')
    .label('Unauthorized Model');

export const clientTimeoutModel = Joi.object({
  statusCode: Joi
      .number()
      .valid(408)
      .required(),
  error: Joi
      .string()
      .valid('Request Time-out')
      .required(),
  message: Joi
      .string()
      .example('Request Time-out')
      .required()
}).description('408 Request Time-out')
    .label('Client Timeout Model');

export const badResponseModel = Joi.object({
  statusCode: Joi
      .number()
      .integer()
      .valid('500')
      .required(),
  error: Joi
      .string()
      .valid('Internal Server Error')
      .required(),
  message: Joi
      .string()
      .example('An internal server error occurred')
      .required()
}).description('500 Internal Server Error')
    .label('Bad Response Model');

export const serviceUnavailableModel = Joi.object({
  statusCode: Joi
      .number()
      .integer()
      .valid('503')
      .required(),
  error: Joi
      .string()
      .valid('Service Unavailable')
      .required(),
  message: Joi
      .string()
      .example('An internal server error occurred')
      .required()
}).description('503 Service Unavailable')
    .label('Service Unavailable Model');

export const gatewayTimeoutModel = Joi.object({
  statusCode: Joi
      .number()
      .integer()
      .valid('504')
      .required(),
  error: Joi
      .string()
      .valid('Gateway Time-out')
      .required(),
  message: Joi
      .string()
      .example('Timeout of 10000ms exceeded. Please try again.')
      .required()
}).description('504 Gateway Time-out')
    .label('Gateway Timeout Model');