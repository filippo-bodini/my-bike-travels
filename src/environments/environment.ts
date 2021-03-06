// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiTflEndpoint: 'https://api.tfl.gov.uk/BikePoint',
  opencagedataEndpoint: 'https://api.opencagedata.com/geocode/v1/json',
  opencagedataKey: 'e3005b4b1c7344568b1b70e324c3a7ff',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
