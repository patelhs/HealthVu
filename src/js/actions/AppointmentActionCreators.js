
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
  },

  saveAppointment: (appointment) => {
    let promise = AppointmentService.saveAppointment(appointment);
    dispatchAsync(promise, {
      request: ActionTypes.SAVE_APPOINTMENT_DATA,
      success: ActionTypes.SAVE_APPOINTMENT_DATA_SUCCESS,
      failure: ActionTypes.SAVE_APPOINTMENT_DATA_ERROR
    }, {appointment});
  }
}

//getAppointment: (appointmentId) => {}
//saveAppointment: (appointment) => {}
//exportAppointments: (appointments) => {}


