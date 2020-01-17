
// Server
import * as Server from './Server'

// Catch unhandling unexpected exceptions
process.on('uncaughtException', (err: Error) => {
  console.error(err)
});

// Catch unhandling rejected promises
process.on('unhandledRejection', (err: any) => {
  console.error(err);
  process.exit(1);
});

// Define async start function
const start = async () => {
  try {
    const server = await Server.init();
    await server.start();

    // Printing to console
    const serverURL = `${server.info.uri}/documentation`;
    console.log(`Server running at: ${serverURL} on environment ${process.env.NODE_ENV || 'dev'}`);
  } catch (err) {
    console.error(err)
  }
};

// Start the server
start();