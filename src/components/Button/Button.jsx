import "./Button.css"

export default function Button({ handleClick, text = "Click", color = "#80ed99", isDisabled = false }) {
    return (
        <button onClick={handleClick} style={{ backgroundColor: color }} disabled={isDisabled}>{text}</button>
    );
};