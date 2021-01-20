import { Gender } from '../app/models/enums/gender.enum';

export const environment = {
  production: true,
  BASE_URL: 'https://stormy-harbor-46959.herokuapp.com/',
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
