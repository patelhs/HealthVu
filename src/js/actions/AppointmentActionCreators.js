
import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import AppointmentService from '../services/AppointmentService';

export default {
  getAppointments: (pageNumber, pageSize) => {
    let promise = AppointmentService.getAll(pageNumber, pageSize);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_APPOINTMENT_DATA,
      success: ActionTypes.REQUEST_APPOINTMENT_DATA_SUCCESS,
      failure: ActionTypes.REQUEST_APPOINTMENT_DATA_ERROR
    }, { pageNumber, pageSize });
  },

  getHealthVuAppointments: (practiceId, resultPage, maxResults) => {
    let promise = AppointmentService.getAppointments(practiceId, resultPage, maxResults);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_APPOINTMENT_DATA,
      success: ActionTypes.REQUEST_APPOINTMENT_DATA_SUCCESS,
      failure: ActionTypes.REQUEST_APPOINTMENT_DATA_ERROR
    }, { practiceId, resultPage, maxResults });
  }
}

//getAppointment: (appointmentId) => {}
//saveAppointment: (appointment) => {}
//exportAppointments: (appointments) => {}


