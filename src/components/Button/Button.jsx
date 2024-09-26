// Importing external CSS for button styling
// Button component that accepts props: handleClick, text, color, and isDisabled (with default values)
// It renders a button with an event handler, background color, and disabled state

import "./Button.css"

export default function Button({ handleClick, text = "Click", color = "#80ed99", isDisabled = false }) {
    return (
        <button onClick={handleClick} style={{ backgroundColor: color }} disabled={isDisabled}>{text}</button>
    );
};