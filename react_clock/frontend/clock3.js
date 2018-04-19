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
        this.currentHour = currentTime.getHours();
        this.currentMinutes = currentTime.getMinutes();
        this.currentSeconds = currentTime.getSeconds();
        let isAm = currentHour > 11 ? "PM" : "AM";

        if (this.currentHour > 12) {
            this.currentHour -= 12;
        } else if (this.currentHour === 0) {
            this.currentHour = 12;
        }

        if (this.currentMinutes > 59) {
            this.currentMinutes = 0;
            this.currentHour += 1;
        } else {
            this.currentMinutes += 1;
        }

        if (this.currentSeconds > 59) {
            this.currentSeconds = 0;
            this.currentMinutes += 1;
        } else {
            this.currentSeconds += 1;
        }

    }

    const mainDiv = document.getElementById("main");
    const div = document.createElement("div");
    mainDiv.appendChild(div);


    function render() {

    }
})
