
import request from 'request';
import bluebird from 'bluebird';
import querystring from 'queryString';
import { APPOINTMENTS_API_URL, GET_APPOINTMENTS_URL, SAVE_APPOINTMENT_URL } from '../constants/AppConstants';

import AppointmentStore from '../stores/AppointmentStore';

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

  saveAppointment(appointment){
    console.log(appointment);

    var id_token = localStorage.getItem("jv_jwt");
    //console.log("before sending request: " + id_token);
    var formData = {
      appointmentId: appointment.appointmentId,
      appointmentDateTime: appointment.appointmentDateTime,
      providerPrefix: appointment.providerPrefix,
      providerFirst: appointment.providerFirst,
      providerLast: appointment.providerLast,
      providerMiddle: appointment.providerMiddle,
      providerSuffix: appointment.providerSuffix,
      appointmentLocationName: appointment.appointmentLocationName,
      messageDeliveryPreference: appointment.messageDeliveryPreference,
      patientEmail: appointment.patientEmail,
      patientMobile: appointment.patientMobile,
      patientFirst: appointment.patientFirst,
      patientLast: appointment.patientLast,
      isActive:appointment.isActive
    };
    var data = querystring.stringify(formData);
    var contentLength = data.length;
    var headers = {
      'auth-token': id_token,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'

    }


    return new bluebird((resolve, reject) => {
      request.post(
        {
          url: SAVE_APPOINTMENT_URL,
          headers: headers,
          body: data,
          json: true,
          withCredentials: false
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

  getAppointmentsTotal(practiceId, resultPage, maxResults){
    var id_token = localStorage.getItem("jv_jwt");

    var formData = {
      practiceId: practiceId,
      resultPage: resultPage,
      maxResults: maxResults
    };
    var data = querystring.stringify(formData);
    var contentLength = data.length;
    var headers = {
      'auth-token': id_token,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };

    $.ajax({
      url : GET_APPOINTMENTS_URL,
      type : "post",
      async: false,
      headers: headers,
      data: data,
      success : function(data) {
        if (data != null) {
          AppointmentStore.totalResultCount = data.totalResultCount;
        }
      },
      error: function(err) {
        console.log(err);
      }
    });
  }

  getAppointments(practiceId, resultPage, maxResults){
    var id_token = localStorage.getItem("jv_jwt");
    //console.log("before sending request: " + id_token);

    var formData = {
      practiceId: practiceId,
      resultPage: resultPage,
      maxResults: maxResults
    };
    var data = querystring.stringify(formData);
    var contentLength = data.length;
    var headers = {
      'auth-token': id_token,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'

    }


    return new bluebird((resolve, reject) => {
      request.post(
        {
          url: GET_APPOINTMENTS_URL,
          headers: headers,
          body: data,
          json: true,
          withCredentials: false,
          aysnc: false
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
