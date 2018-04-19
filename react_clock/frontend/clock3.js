// This problem will be a pair-programming problem. Both students will be "interviewees" in this problem. Switch off between driver and navigator every 5 minutes. Be sure to set a timer so that you don't forget to switch!
//
// Using vanilla JS and HTML, build a digital clock that displays the current (west coast; non-military) time.
//
// Notes:
//
// You can only get current time once.
// You must display hours, minutes, seconds, and AM/PM.
// You can only use MDN documentation.
// Style it as best as you can within the allotted time.
// You have 35 minutes to complete this (please set a timer).
// dateObj.getHours() returns the hour from 0 to 23.
// Be sure to pad numbers with zeroes on your clock (ie. 02:45:06, not 2:45:6)
// Be cognizant about testing your code as you go.
// Bonus: Add an alarm functionality to your clock.

document.addEventListener('DOMContentLoaded', () => {
    console.log("Testing");
    var currentTime = new Date();

    function Clock() {
        let currentHours = currentTime.getHours();
        let currentMinutes = currentTime.getMinutes();
        let currentSeconds = currentTime.getSeconds();

        let amPm = currentHours > 11 ? "PM" : "AM";

        let hoursDisplay = document.querySelector(".hours");
        let minutesDisplay = document.querySelector(".minutes");
        let secondsDisplay = document.querySelector(".seconds");
        let amPmDisplay = document.querySelector(".am-pm");

        this.incrementTime = function() {
            setInterval(incrementSeconds, 1000);
        }

        function incrementHours() {
            if (currentHours > 12) {
                currentHours -= 12;
                amPm = 'PM';
            } else if (currentHours === 0) {
                currentHours = 12;
            }
        }

        function incrementMinutes() {
            if (currentMinutes > 59) {
                currentMinutes = 0;
                incrementHours();
            } else {
                currentMinutes += 1;
            }
        }

        function incrementSeconds() {
            if (currentSeconds > 59) {
                currentSeconds = 0;
                incrementMinutes();
            } else {
                currentSeconds += 1;
            }

            render();
        }

        function render() {
            hoursDisplay.innerHTML = addPadding(currentHours);
            minutesDisplay.innerHTML = addPadding(currentMinutes);
            secondsDisplay.innerHTML = addPadding(currentSeconds);
            amPmDisplay.innerHTML = amPm;
        }

    }

    // launch clock
    var clock = new Clock();
    clock.incrementTime();

    // helper method to add "0" padding
    function addPadding(num) {
        if (num < 10) {
            return `0${num}`
        }

        return num;
    }
})
