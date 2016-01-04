var BASE_URL = 'http://localhost:3001/';
var HEALTHVU_URL = 'http://hv-rest-staging.elasticbeanstalk.com/';
export default {
  BASE_URL: BASE_URL,
  LOGIN_URL: BASE_URL + 'sessions/create',
  SIGNUP_URL: BASE_URL + 'users',

  APPOINTMENTS_API_URL: BASE_URL + 'api/appointments',
  GET_APPOINTMENTS_URL: HEALTHVU_URL + 'view-appointments',
  SAVE_APPOINTMENT_URL: HEALTHVU_URL + 'add-appointment'
}
