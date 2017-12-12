class Events {
  constructor() {
    this._listeners = new Set;
  }
  
  listen(name, callback) {
    this._listeners.add({
      name,
      callback,
    });
  }

  // emit events for position changes and updating score
  emit(name, ...data) { // ...data rest operator is used put rest of args in the data variable as an array after name arg is specified
    this._listeners.forEach(listener => {
      if (listener.name === name) {
        listener.callback(...data); // call callback with all args spread out as an array. Same as listener.callback(data[0], data[1], ...)
      }
    });
  }
}
