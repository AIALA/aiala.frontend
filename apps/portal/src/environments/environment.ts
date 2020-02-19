// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appConfig: {
    api: {
      basePath: 'http://localhost:5500/api'
    },
    authSettings: {
      client_id: 'msft.aiala.webapp',
      response_type: 'id_token token',
      scope: 'openid profile directory',
      stsServer: 'http://localhost:5000',
      redirect_url: 'http://localhost:4567',
      post_logout_redirect_uri: 'http://localhost:4567'
    },
    external: {
      googleApiKey: '',
      azureApiKey: ''
    },
    signalR: {
      url: 'http://localhost:5500/hubs'
    },
    invitation: {
      redirectUrl: 'http://localhost:4567'
    },
    registration: {
      redirectUrl: 'http://localhost:4567'
    },
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
