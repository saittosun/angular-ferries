// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Gender } from 'src/app/models/enums/gender.enum';

export const environment = {
  production: false,
  BASE_URL: 'http://127.0.0.1:8000/',
  MAX_PASSENGER_COUNT: 10,
  MIN_PASSENGER_COUNT: 1,
  MAX_VEHICLE_COUNT: 5,
  MIN_VEHICLE_COUNT: 0,
  DEFAULT_DISCOUNT_NAME: 'NO DISCOUNT',
  GENDERS: [Gender.MALE, Gender.FEMALE],
  SERVICE_FEE: 0,
  AGE_FLEXIBILITY: 2600000000, // This shows how many days passes to accept. For ex: 13 month pass for 1 year limit.
  TOKEN_KEY: 'Authorization',
  USER_EMAIL_KEY: 'email',
  USER_FIRST_NAME_KEY: 'firstName',
  USER_LAST_NAME_KEY: 'lastName',
  USER_ROLE_KEY: 'role',
  TOKEN_EXPIRATION_TIME: 'token_validity',
  ADD_VEHICLE: 'ADD_VEHICLE',
  REMOVE_VEHICLE: 'REMOVE_VEHICLE',
  ADD_PASSENGER: 'ADD_PASSENGER',
  REMOVE_PASSENGER: 'REMOVE_PASSENGER',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
