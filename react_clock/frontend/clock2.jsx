import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// build clock by calling new Date() only once
class Clock2 extends Component {
    constructor() {
        super();
        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0,
            ampm: "AM",
        }

        this.onTick = this.onTick.bind(this);
        this.getTime = this.getTime.bind(this);
        this.displayTime = this.displayTime.bind(this);
    }

    componentDidMount() {
        this.getTime();
        this.interval = setInterval(this.onTick, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getTime() {
        const time = new Date();
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const ampm = (hours > 11 ? "PM" : "AM");
        this.setState({
            hours,
            minutes,
            seconds,
            ampm,
        });
    }

    onTick() {
        let { hours, minutes, seconds, ampm } = this.state;
        if (seconds < 59) {
            seconds += 1;
        } else {
            seconds = 0;
            if (minutes < 59) {
                minutes += 1;
            } else {
                minutes = 0;
                if (hours < 23) {
                    hours += 1;
                } else {
                    hours = 0;
                }
            }
        }
        ampm = (hours > 11 ? "PM" : "AM");

        this.displayTime();
        this.setState({
            hours,
            minutes,
            seconds,
            ampm,
        });
    }

    displayTime() {
        let { hours, minutes, seconds, ampm } = this.state;
        hours = (hours > 11 ? hours - 12 : hours);
        ampm = (hours > 11 ? "PM" : "AM");
        hours = (hours > 9 ? hours : `0${hours}`);
        minutes = (minutes > 9 ? minutes : `0${minutes}`);
        seconds = (seconds > 9 ? seconds : `0${seconds}`);
        console.log(hours);
    }

    render() {
        const { hours, minutes, seconds, ampm } = this.state;

        return (
            <div>
                <p>Testing</p>
                { hours }:{ minutes }:{ seconds } { ampm }
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let main = document.getElementById("main");
    ReactDOM.render(<Clock2 />, main);
});
