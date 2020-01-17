//npm libraries
import * as Hapi from '@hapi/hapi'
// API
import * as API from './api'

export async function init(): Promise<Hapi.Server> {
  try {
    const server = new Hapi.Server({
      port: 8888,
      host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    });

    const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [
      {
        plugin: require('@hapi/inert')
      },
      {
        plugin: require('@hapi/vision')
      },
      {
        plugin: require('hapi-swagger'),
        options: {
          info: {
            title: 'kaplan360 - API Documentation',
            contact: {
              name: 'veddev0x',
              email: 'veddev@pm.me'
            }
          },
          grouping: 'tags'
        }
      }
    ];

    // Register plugins
    await server.register(plugins);

    // Initiate APIs
    API.Session.init(server);

    return server;
  } catch (err) {
    throw err;
  }
}