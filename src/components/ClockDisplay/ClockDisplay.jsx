// ClockDisplay component that takes in hrs, mins, and secs (with default values)
// It formats and displays the time with leading zeros where needed

export default function ClockDisplay({ hrs = 0, mins = 0, secs = 0 }) {
    return (
        <h2 id="clock"><span>{hrs < 10 ? "0" + hrs : hrs}</span>:<span>{mins < 10 ? "0" + mins : mins}</span>:<span>{secs < 10 ? "0" + secs : secs}</span></h2>
    );
};