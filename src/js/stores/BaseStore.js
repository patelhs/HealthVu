import { EventEmitter } from 'events';
import { register } from '../dispatchers/AppDispatcher';

export default class BaseStore extends EventEmitter {

  constructor() {
    super();
  }

  subscribe(actionSubscribe) {
    this._dispatchToken = register(actionSubscribe());
    //console.log("In subscription");
  }

  get dispatchToken() {
    return this._dispatchToken;
  }

  emitChange() {
    $('#loading-indicator').hide();
    this.emit('CHANGE');
  }

  addChangeListener(cb) {
    this.on('CHANGE', cb)
  }

  removeChangeListener(cb) {
    this.removeListener('CHANGE', cb);
  }
}
