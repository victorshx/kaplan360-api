# edugateway

[![Build Status](https://travis-ci.com/veddev0x/kaplan360-api.svg?branch=v2)](https://travis-ci.com/veddev0x/kaplan360-api/tree/v2)

edugateway is an unofficial REST API offering a unified access to multiple educational institution.

The entire project has been rewritten from scratch in Typescript and hapi web framework. However, it's still in alpha, please do not expect that all API will work. As the project starts to grow out of a single educational institution gateway, the complexity of the project will grow out of its size hence I made the decision to bump the version. The focus of this version is to encourage modular coding, enforce a clean directory structure rule, and make sure code is reusable.

## Documentation

The entry file of the application is dist/index.js, it initializes the server object and call start() function to start the server.

Subsequently, it will output to stdout of the server url and environment.

### Server

server.ts is responsible for configuring the port and host of the application, registering plugins, and initiating APIs.

### API

Each API will stay in its own directory and sub directory. For Session API, it's located in api/session. The Services directory provides out-of-the-box modular functions for APIs. Under the Session API, Session Authorization API can call GetSessionAuthorization() using the statement below. 
```
await Services.Session.Kaplan.GetSessionAuthorization(username, password)
```

### Route

The routes is responsible for accepting incoming requests and pass it to the corresponding controller. In addition, it is also responsible for performing validation of path parameters, queries, payload, headers, and response. Here is an example of the uri of Session Authorization API. 
```
/api/{gateway}/session/authorize
```

### Controller

The controller is responsible for handling the main business logic, it will return response according to the incoming request queries, parameters, or payload.
```
Services.Session.{gateway}.GetSessionAuthorization(username, password)
```

### Schema

The schema is a Joi object for comparing two objects and validate if both is identical. In this case, the schema is responsible for validating response. Below is an example of the response of Session Authorization API, failing to validate will return a 500 internal server error.
```
{
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
}
``` 

### Validator

The validator is a Joi object for validating objects as well, but it's responsible for validating route headers, queries, and parameters. Below is an example of the credentials payload of Session Authorization APi.
```
{
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
}
``` 

## Credits

Created and maintained by VEDDEV ([@veddev0x](https://github.com/veddev0x)).

## License

`edugateway` is available under the MIT license. See the [LICENSE](LICENSE) file for more info.



 
