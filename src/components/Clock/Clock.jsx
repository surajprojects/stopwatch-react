import { useState, useRef } from "react";
import ClockDisplay from "../ClockDisplay/ClockDisplay";
import Button from "../Button/Button";

// Clock component manages the stopwatch functionality

export default function Clock() {

    // State to store the clock time in [hrs, mins, secs] format
    const [clock, setClock] = useState([0, 0, 0]);

    // State to manage the disabled state of buttons (start, stop, reset)
    const [isBtnDisabled, setIsBtnDisabled] = useState({ startBtn: false, stopBtn: true, resetBtn: true });

    // useRef to hold the interval ID for the clock updates
    const intervalId = useRef(null);

    // Function to update the clock every second
    const handleClock = () => {
        let [clockHrs, clockMins, clockSecs] = clock;

        // Increment seconds or update minutes/hours based on conditions
        if (clockMins < 60 && clockSecs < 59) {
            clockSecs = clockSecs + 1;
        }
        else if (clockMins < 59 && clockSecs === 59) {
            clockSecs = 0;
            clockMins = clockMins + 1;
        }
        else if (clockMins === 59) {
            clockMins = 0;
            clockSecs = 0;
            clockHrs = clockHrs + 1;
        }
        else {
            // Reset the clock in case of an unexpected scenario
            clockHrs = 0;
            clockMins = 0;
            clockSecs = 0;
            alert("ERROR ENCOUNTERED!!! PLEASE CONTACT US FOR SUPPORT!!!");
            alert("RESETTING THE CLOCK!!!");
            clearInterval(intervalId.current);
            setIsBtnDisabled((prevState) => {
                return { ...prevState, startBtn: false, stopBtn: true, resetBtn: true };
            });
        }

        // Update the clock state with the new time
        setClock(() => {
            clock[0] = clockHrs;
            clock[1] = clockMins;
            clock[2] = clockSecs;
            return clock.map(t => t);
        });
    };

    // Start the clock by setting an interval and updating button states
    const runClock = () => {
        intervalId.current = setInterval(handleClock, 1000);
        setIsBtnDisabled((prevState) => {
            return { ...prevState, startBtn: true, stopBtn: false, resetBtn: true };
        });
    };

    // Stop the clock by clearing the interval and updating button states
    const stopClock = () => {
        clearInterval(intervalId.current);
        setIsBtnDisabled((prevState) => {
            return { ...prevState, startBtn: false, stopBtn: true, resetBtn: false };
        });
    };

    // Reset the clock to [0, 0, 0] and update button states
    const resetClock = () => {
        setClock([0, 0, 0]);
        setIsBtnDisabled((prevState) => {
            return { ...prevState, startBtn: false, stopBtn: true, resetBtn: true };
        });
    };

    return (
        <>
            <main className="container">
                <h1>StopWatch</h1>

                {/* Display the current clock time */}
                <ClockDisplay hrs={clock[0]} mins={clock[1]} secs={clock[2]} />

                <div id="clockButtons">
                    {/* Buttons to start, stop, and reset the clock */}
                    <Button handleClick={runClock} text="Start" color="#99d98c" isDisabled={isBtnDisabled.startBtn} />
                    <Button handleClick={stopClock} text="Stop" color="#ef233c" isDisabled={isBtnDisabled.stopBtn} />
                    <Button handleClick={resetClock} text="Reset" color="#fca311" isDisabled={isBtnDisabled.resetBtn} />
                </div>
            </main>
        </>
    );
};
