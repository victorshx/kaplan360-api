import {Kaplan} from './gateway'

export interface ISessionAuthorization {
  expires_in?: number;
  value: string;
  type: string;
}

export {
  Kaplan
}