/*
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';


class AppointmentStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._appointments = null;
    this._error = null;
  }

  _registerToActions(action) {
    switch(action.type) {

      case ActionTypes.REQUEST_APPOINTMENT_DATA:
        this._appointments = action.body;
        localStorage.setItem("appointments", this._appointments);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_APPOINTMENT_DATA_ERROR:
        this._error = action.error;
        this.emitChange();
        break;

      default:
        break;
    };
  }

  get appointments() {
    return this._appointments;
  }

  get error() {
    return this._error;
  }
}

export default new AppointmentStore();
*/