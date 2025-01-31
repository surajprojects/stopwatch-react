const btnStart = document.querySelector("#btnStart");
const btnStop = document.querySelector("#btnStop");
const btnReset = document.querySelector("#btnReset");
const hrs = document.querySelector("#hrs");
const mins = document.querySelector("#mins");
const secs = document.querySelector("#secs");

let clockSecs = 0;
let clockMins = 0;
let clockHrs = 0;

function watchClock() {
    if (clockMins < 60 && clockSecs < 60) {
        clockSecs = clockSecs + 1;
        secs.textContent = clockSecs < 10 ? `0${clockSecs}` : clockSecs;
    }
    else if (clockMins < 60 && clockSecs === 60) {
        clockSecs = 0;
        clockMins = clockMins + 1;
        secs.textContent = clockSecs < 10 ? `0${clockSecs}` : clockSecs;
        mins.textContent = clockMins < 10 ? `0${clockMins}` : clockMins;
    }
    else if (clockMins === 60) {
        clockMins = 0;
        clockSecs = 0;
        clockHrs = clockHrs + 1;
        secs.textContent = clockSecs < 10 ? `0${clockSecs}` : clockSecs;
        mins.textContent = clockMins < 10 ? `0${clockMins}` : clockMins;
        hrs.textContent = clockHrs < 10 ? `0${clockHrs}` : clockHrs;
    }
    else {
        clockSecs = 0;
        clockMins = 0;
        clockHrs = 0;
        secs.textContent = clockSecs < 10 ? `0${clockSecs}` : clockSecs;
        mins.textContent = clockMins < 10 ? `0${clockMins}` : clockMins;
        hrs.textContent = clockHrs < 10 ? `0${clockHrs}` : clockHrs;
        alert("ERROR ENCOUNTERED!!! PLEASE CONTACT US IF THE ERROR PERSISTS!!!");
    }
};

function runClock() {
    const intervalId = setInterval(watchClock, 1000);

    btnReset.addEventListener("click", function (e) {
        e.preventDefault();
        clockHrs = 0;
        clockMins = 0;
        clockSecs = 0;
        hrs.textContent = "00";
        mins.textContent = "00";
        secs.textContent = "00";
        btnStop.disabled = true;
        btnStart.disabled = false;
        btnReset.disabled = false;
        clearInterval(intervalId);
    });

    btnStop.addEventListener("click", function (e) {
        e.preventDefault();
        btnStop.disabled = true;
        btnStart.disabled = false;
        btnReset.disabled = false;
        clearInterval(intervalId);
    });

};

btnStart.addEventListener("click", function (e) {
    e.preventDefault();
    btnStop.disabled = false;
    btnStart.disabled = true;
    btnReset.disabled = true;
    runClock();
});