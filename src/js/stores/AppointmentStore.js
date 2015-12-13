
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import AppointmentActionCreator from '../actions/AppointmentActionCreators';


class AppointmentStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._appointments = null;
    this._error = null;

    console.log("store kicked in");
  }

  _registerToActions(action) {
    switch(action.type) {

      case ActionTypes.REQUEST_APPOINTMENT_DATA_SUCCESS:
        console.log(action.body.items);
        this._appointments = action.body.items;
//        localStorage.setItem("appointments", this._appointments);
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

  _getAppointments(){
    console.log("in store get");
  }

  get appointments() {
    console.log("store prop" + this._appointments);
    return this._appointments;
  }

  get error() {
    return this._error;
  }
}

export default new AppointmentStore();
