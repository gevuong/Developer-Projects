import React { Component } from 'react';
import ReactDOM from 'react-dom';

class Clock2 extends Component {
    constructor() {
        super();
        this.state = {
            hours: "",
            minutes: "",
            seconds: "",
            ampm: "",
        }

        this.onTick = this.onTick.bind(this);
        this.getTime = this.getTime.bind(this);
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

    }

    onTick() {
        this.setState({

        })
    }

    render() {
        const { hours, minutes, seconds, ampm } = this.state;

        return (
            <div>
                { hours }:{ minutes }:{ seconds } { ampm }
            </div>
        )
    }
}

export default Clock2;
