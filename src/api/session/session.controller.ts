// npm libraries
import {Request, ResponseToolkit} from "@hapi/hapi";
import Boom from "@hapi/boom";
// Services
import * as Services from '../../services'
// Interfaces
import {ISessionAuthorization} from "../../services/session";

export async function GetSessionAuthorization(req: Request, h: ResponseToolkit) {
  try {
    const gatewayType: string = req.params.gateway;
    // @ts-ignore
    const username: string = req.payload.username;
    // @ts-ignore
    const password: string = req.payload.password;

    switch (gatewayType) {
      case 'kaplan':
        return sessionAuthorizationApiResponseBuilder(await Services.Session.Kaplan.GetSessionAuthorization(username, password) as ISessionAuthorization)
    }
  } catch (err) {
    return Boom.isBoom(err) ? err : Boom.badImplementation(err.message);
  }
}

const sessionAuthorizationApiResponseBuilder = (authTokenObject: ISessionAuthorization) => {
  return {
    success: true,
    token: authTokenObject
  }
};