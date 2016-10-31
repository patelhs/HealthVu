
import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import AppointmentActionCreator from '../actions/AppointmentActionCreators';

class AppointmentStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));

    this._appointments = null;
    this._error = null;
    this._practiceId = 1;
    this._resultPage = 0;
    this._maxResults = 10;
    this._totalResultCount = 0;
  }

  _registerToActions(action) {
    switch(action.type) {

      case ActionTypes.REQUEST_APPOINTMENT_DATA_TOTAL:
            //console.log("Request total " + JSON.stringify(action));
            break;
      case ActionTypes.REQUEST_APPOINTMENT_DATA_TOTAL_SUCCESS:
            this._totalResultCount = action.body.totalResultCount;
            this.emitChange();
            break;
      case ActionTypes.REQUEST_APPOINTMENT_DATA_TOTAL_ERROR:
            this.emitChange();
            break;

      case ActionTypes.REQUEST_APPOINTMENT_DATA_SUCCESS:
        //console.log("after success " + JSON.stringify(action));
        console.log(action.body.items);
        this._appointments = action.body.items;
        this._error = null;
        this._maxResults = action.maxResults;
        this._resultPage = action.resultPage;
        this._practiceId = action.practiceId;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_APPOINTMENT_DATA_ERROR:
        this._error = action.error;
        this.emitChange();
        break;
      case ActionTypes.SAVE_APPOINTMENT_DATA_SUCCESS:
        this._error = null;
        this.emitChange();
        break;
      case ActionTypes.SAVE_APPOINTMENT_DATA_ERROR:
        this._error = action.error;
        //console.log("in store: " + this._error);
        this.emitChange();
        break;
      default:
        break;
    };
  }

  _getAppointments(){
    //console.log("in store get");
  }

  set totalResultCount(value){
    this._totalResultCount = value;
  }

  get appointments() {
    return this._appointments;
  }

  get error() {
    return this._error;
  }
  get practiceId(){
    return this._practiceId;
  }

  get totalResultCount(){
    return this._totalResultCount;
  }
  get maxResults(){
    return this._maxResults;
  }
  get resultPage(){
    return this._resultPage;
  }
}

export default new AppointmentStore();
