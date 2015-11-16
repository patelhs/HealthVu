
import request from 'request';
import bluebird from 'bluebird';
import { APPOINTMENTS_API_URL } from '../constants/AppConstants';

class AppointmentService {

  getAll() {
    return new bluebird( (resolve, reject) => {
      request.get(
        {
          url: APPOINTMENTS_API_URL,
          body: null,
          json: true
        },
        (err, response, body) => {
          if(err){
            return reject(err);
          }
          if(response.statusCode >= 400){
            return reject(body);
          }
          return resolve(body);
        }
      );
    });
  }
}

export default new AppointmentService();