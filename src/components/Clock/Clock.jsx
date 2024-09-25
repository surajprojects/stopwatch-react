import { useState, useRef } from "react";
import ClockDisplay from "../ClockDisplay/ClockDisplay";
import Button from "../Button/Button";

export default function UpdateClock() {
    const [clock, setClock] = useState([0, 60, 0]);
    const [isBtnDisabled, setIsBtnDisabled] = useState({ startBtn: false, stopBtn: true, resetBtn: true });
    const intervalId = useRef(null);

    const handleClock = () => {
        let [clockHrs, clockMins, clockSecs] = clock;

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

        setClock(() => {
            clock[0] = clockHrs;
            clock[1] = clockMins;
            clock[2] = clockSecs;
            return clock.map(t => t);
        });
    };

    const runClock = () => {
        intervalId.current = setInterval(handleClock, 1000);
        setIsBtnDisabled((prevState) => {
            return { ...prevState, startBtn: true, stopBtn: false, resetBtn: true };
        });
    };

    const stopClock = (id = intervalId) => {
        clearInterval(intervalId.current);
        setIsBtnDisabled((prevState) => {
            return { ...prevState, startBtn: false, stopBtn: true, resetBtn: false };
        });
    };

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
                <ClockDisplay hrs={clock[0]} mins={clock[1]} secs={clock[2]} />
                <div id="clockButtons">
                    <Button handleClick={runClock} text="Start" color="#99d98c" isDisabled={isBtnDisabled.startBtn} />
                    <Button handleClick={stopClock} text="Stop" color="#ef233c" isDisabled={isBtnDisabled.stopBtn} />
                    <Button handleClick={resetClock} text="Reset" color="#fca311" isDisabled={isBtnDisabled.resetBtn} />
                </div>
            </main>
        </>
    );
};
