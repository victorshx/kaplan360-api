// npm libraries
import * as Joi from "@hapi/joi";

export const sessionAuthorizationResponseModel = Joi.object({
  success: Joi
      .boolean()
      .required(),
  token: {
    expires_in: Joi
        .number()
        .positive()
        .integer()
        .example('2591999')
        .required(),
    value: Joi
        .string()
        .trim()
        .example('eyJ0eXAiOiJKV1QiLCJhbGciJ0b2tlbk5hbWUiOiJpZF90b2tlbiIsImF6cCI6ImthcGxhbjM2MCIsInN1YiI6IkNUMDI4NjQwMSIsImF0X2hhc2giOiJJNnZDQU5ZcWx1cjVoWU91MFN3REVBIiwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5rYXBsYW4uY29tLnNnOjQ0My9hdXRoL29hdXRoMiIsIm9yZy5mb3JnZXJvY2sub3BlbmlkY29ubmVjdC5vcHMiOiJmNTZmMjk0YS1iMDJlLTRmMWUtODNmMC1iYmQ1YmE4M2Q0NzEiLCJpYXQiOjE1NzkyNjM5MjYsImF1dGhfdGltZSI6MTU3OTI2MzkyNiwiZXhwIjoxNTc5NjIzOTI2LCJ0b2tlblR5cGUiOiJKV1RUb2tlbiIsImF1ZGl0VHJhY2tpbmdJZCI6Ijc1Y2E2YTA5LWY5ZDEtNxhbjM2MCJ9.WKiTSpthBZWz-H1v2c2rRpDjaXuV7aAgR3kjmKwQdRhqhOv27ylZ3o3qHTmbb9NFVy6sO1JcBzVo5WYtBQFxQZxdviLn7868FwZ8__gY5w-uP4DmMhebVC_Fmw3Ii8p9XVFhhRIpz7pQAMhpYXknBrVJYYnU1bF4AFxpMw')
        .required(),
    type: Joi
        .string()
        .valid('cookie', 'jwt')
        .required()
  }
}).label('Session Authorization Response Model');