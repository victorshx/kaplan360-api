// npm libraries
import * as Hapi from '@hapi/hapi'
// Routes
import SessionRoutes from './session.routes'

export function init(server: Hapi.Server) {
  SessionRoutes(server);
  console.log('Session routes registered!')
}
