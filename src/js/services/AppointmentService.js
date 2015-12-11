
import request from 'request';
import bluebird from 'bluebird';
import { APPOINTMENTS_API_URL } from '../constants/AppConstants';

class AppointmentService {

  getAll(pageNumber, pageSize) {
    return new bluebird( (resolve, reject) => {
      request.post(
        {
          url: APPOINTMENTS_API_URL,
          body: {pageNumber, pageSize},
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
