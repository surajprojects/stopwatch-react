import { useState, useRef } from "react";
import ClockDisplay from "../ClockDisplay/ClockDisplay";
import Button from "../Button/Button";

export default function UpdateClock() {
    const [clock, setClock] = useState([0, 0, 0]);
    const [isBtnDisabled, setIsBtnDisabled] = useState({ startBtn: false, stopBtn: true, resetBtn: true });
    const intervalId = useRef(null);

    const handleClock = () => {
        let [clockHrs, clockMins, clockSecs] = clock;

        if (clockMins < 60 && clockSecs < 60) {
            clockSecs = clockSecs + 1;
        }
        else if (clockMins < 60 && clockSecs === 60) {
            clockSecs = 0;
            clockMins = clockMins + 1;
        }
        else if (clockMins === 60) {
            clockMins = 0;
            clockSecs = 0;
            clockHrs = clockHrs + 1;
        }
        else {
            clockSecs = 0;
            clockMins = 0;
            clockHrs = 0;
            alert("ERROR ENCOUNTERED!!! PLEASE CONTACT US IF THE ERROR PERSISTS!!!");
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
        setIsBtnDisabled(() => {
            isBtnDisabled.startBtn = true;
            isBtnDisabled.stopBtn = false;
            isBtnDisabled.resetBtn = true;
            return { ...isBtnDisabled };
        });
    };

    const stopClock = (id = intervalId) => {
        clearInterval(intervalId.current);
        setIsBtnDisabled(() => {
            isBtnDisabled.startBtn = false;
            isBtnDisabled.stopBtn = true;
            isBtnDisabled.resetBtn = false;
            return { ...isBtnDisabled };
        });
    };

    const resetClock = () => {
        setClock(() => {
            clock[0] = 0;
            clock[1] = 0;
            clock[2] = 0;
            return clock.map(t => t);
        });
        setIsBtnDisabled(() => {
            isBtnDisabled.startBtn = false;
            isBtnDisabled.stopBtn = true;
            isBtnDisabled.resetBtn = true;
            return { ...isBtnDisabled };
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
