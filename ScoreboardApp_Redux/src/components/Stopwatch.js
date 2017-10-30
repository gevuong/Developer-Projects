import React, { Component } from 'react';

// Logical, presentational component, will often render a view, but manages its own state and may use lifecycle events.
export default class Stopwatch extends Component {
  constructor() {
    super();
    this.state = { // local state
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    }
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onTick = this.onTick.bind(this);
  }

  // As soon as Stopwatch component is added to DOM on page, componentDidMount() will be called. Convenient for setting up timers, data fetching, etc.
  componentDidMount() {
    this.interval = setInterval(this.onTick, 100); // invisible event
  }

  // invoked immediately before component is removed from DOM. Convenient for invalidating timers, canceling network requests, or DOM elements created in componentDidMount. In case if stopwatch no longer needs to rendered, clearInterval will remove setInterval, which can keep Stopwatch component in memory, causing a memory leak.
  componentWillUnmount() {
    clearInterval(this.interval); // cleanup interval
  }

  // To get onTick to be called over and over again, cannot put in render(), but can be placed in componentDidMount().
  onTick() {
    console.log('onTick');
    if (this.state.running) {
      let timeNow = Date.now(); // returns number of ms since Jan 1,1970 (UNIX epoch)
      this.setState({
        previousTime: timeNow,
        elapsedTime: this.state.elapsedTime + (timeNow - this.state.previousTime),
      });
    }
  }

  onStart(e) {
    this.setState({
      running: true,
      previousTime: Date.now(),
    });
  }

  onStop(e) {
    this.setState({ running: false });
  }

  onReset() {
    this.setState({
      running: false,
      elapsedTime: 0,
      previousTime: Date.now() // update previousTime so next tick will get exact same amount of ms between when we reset versus the previous tick.
    });
  }

  render() {
    let nowSeconds = Math.floor(this.state.elapsedTime / 1000);
    let seconds;
    nowSeconds % 60 < 10 ? seconds = '0' + (nowSeconds % 60) : seconds = nowSeconds % 60;
    let minutes = Math.floor(nowSeconds / 60);
    Math.floor(nowSeconds / 60) < 10 ? minutes = '0' + minutes : minutes;

    return(
      <div className="stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{ minutes }:{ seconds }</div>
        {/* alternative can be { this.state.running ? "Start" : "Stop" } */}
        { this.state.running ?
          <button type="submit" onClick={this.onStop}>Stop</button>
          :
          <button type="submit" onClick={this.onStart}>Start</button>
        }
        <button onClick={this.onReset}>Reset</button>
      </div>
    )
  }
}
