# kaplan360-api

[![Build Status](https://travis-ci.com/veddev0x/kaplan360-api.svg?branch=master)](https://travis-ci.com/veddev0x/kaplan360-api)
[![Dependencies](https://david-dm.org/veddev0x/kaplan360-api.svg)](https://david-dm.org/veddev0x/kaplan360-api)
[![License](https://img.shields.io/github/license/veddev0x/kaplan360-api.svg)](LICENSE)


kaplan360-api is an unofficial REST API for the Kaplan360 mobile application, I painstainly reverse-engineered the mobile application, and looked through dozens of OpenAM/OpenIDM knowledgebase for 1-2 weeks to chain the private API requests. It is built using Node.js, Express.js, and uses ES6 syntax and Async-Await/Promise for code clarity and performance.

kaplan360-api offers a few key features:
- Intuitive API, we handle the complex multi-chaining OAuth2 and OpenAM/OpenIDM REST API for you. Built-in token refresh and error handling for OAuth2 Credentials and JWT expiry, no more finding error in a haystack.
- Extended Classroom Schedule, from the first session to last session!
- Extended Attendance Status, view previous month and further! **(coming soon)**
- Robust Notifications API for viewing, search filtering, page and limit pagination, and sorting unread/archived. **(coming soon)**
- Pleasant RU(Read, Update) sub-resources routes for updating profile, changing password, creating a leave application, requesting a document, and many more! **(coming soon)**
- Keep-alive and gzip everywhere!
- Totally asynchronous and non-blocking code, optimised for speed and performance.
 
## Installation
### Requirements

- macOS 10.9+ / Linux
- [Node.js](https://nodejs.org/) `>=8` (6.x and 7.x may work but is no longer tested, please upgrade)



1. Create a folder to hold your installation: `mkdir kaplan360-api`
2. FTP/Copy the contents of the zip to your newly created folder
3. Enter folder: `cd kaplan360-api`
4. Install dependencies: `npm install`
5. Start application: `npm start --production`
6. Visit [http://127.0.0.1:8888](http://127.0.0.1:8888) in your browser


Keeping kaplan360-api running after closing the terminal can be done in a few ways but we recommend using the `PM2` package. To set this up:

1. Install PM2: `npm install pm2 -g`
2. Add expressCart to PM2: `NODE_ENV=production pm2 start app.js --name "kaplan360-api"`
3. Check PM2 has our app: `pm2 list`
4. Save the PM2 config: `pm2 save`
5. To start/stop: `pm2 start kaplan360-api` / `pm2 stop kaplan360-api`

> Note: Node.js version 7.x or greater is needed.


## Tests
```sh
npm test
```

## API Documentation
 
TODO: **ADD INFO**
 
## History
 
Version 0.1 (Initial Commit) - Added session authentication and token refresh.

Version 0.2 - Refactored session routes, deprecated session refresh route, token will be refreshed automatically instead. Added student route for profile info with sub-resources support for university partner, and extended classroom schedule.
 
## Credits

Created and maintained by VEDDEV ([@veddev0x](https://github.com/veddev0x)).

## License

`kaplan360-api` is available under the MIT license. See the [LICENSE](LICENSE) file for more info.
 
