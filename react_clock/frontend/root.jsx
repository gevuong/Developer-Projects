import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Root extends Component {
    constructor() {
        super();
        this.state = {
            date: new Date(),
        }

        this.onTick = this.onTick.bind(this);
    }

    componentDidMount() {
        this.interval = setInterval(this.onTick, 60)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onTick() {
        // console.log("onTick: ");
        let timeNow = new Date();
        // let timeNow = Date.now();
        this.setState({
            date: timeNow,
        })
    }

    render() {
        const { date } = this.state;
        const currentHour = date.getHours();
        const currentMinutes = date.getMinutes();
        const currentSeconds = date.getSeconds();

        const hours = (currentHour >= 12 ? currentHour - 12 : currentHour);
        const ampm = (currentHour > 11 ? "PM" : "AM");
        const minutes = (currentMinutes >= 10 ? currentMinutes : "0" + currentMinutes.toString());
        const seconds = (currentSeconds >= 10 ? currentSeconds : "0" + currentSeconds.toString());

        return(
            <div>
                <h1>{ hours }:{ minutes }:{ seconds } {ampm}</h1>
                React is up and running!
            </div>
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Root/>, document.getElementById('main'));
});
