
import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import AppointmentService from '../services/AppointmentService';

export default {
  getAppointments: () => {
    let promise = AppointmentService.getAll();
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_APPOINTMENT_DATA,
      success: ActionTypes.REQUEST_APPOINTMENT_DATA_SUCCESS,
      failure: ActionTypes.REQUEST_APPOINTMENT_DATA_ERROR
    }, {});
  }
}

//getAppointment: (appointmentId) => {}
//saveAppointment: (appointment) => {}
//exportAppointments: (appointments) => {}