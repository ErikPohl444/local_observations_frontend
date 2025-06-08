import React, { useState } from "react";
import "./App.css";
import DataStream from "./DataStream";
import Timer from "./Timer";

// Main App component that manages the state and renders the DataStream and Timer components
function App() {
  // State to manage the visibility of the DataStream component
  const [showDataStream, setShowDataStream] = useState(false);
  // State to manage the timer value and its end state
  const [timerValue, setTimerValue] = useState(0);
  // State to track if the timer has ended
  const [timerEnded, setTimerEnded] = useState(false);
  // Key to force re-render of the Timer component
  const [timerKey, setTimerKey] = useState(0);

  const handleButtonClick = () => {
    setShowDataStream(!showDataStream);
  };
  // Function to handle the end of the timer and reset the timer
  // It also triggers the DataStream component to reload
  const handleTimerEnd = () => {
    setTimerEnded(true);
    setShowDataStream(true);
    setTimerValue(10);
    handleButtonClick();
    setTimeout(() => {
      setTimerEnded(false);
      setTimerKey((k) => k + 1);
      setShowDataStream(true);
    }, 0);
  };

  // Function to handle the timer value updates
  const handleTimerValue = (currentValue: number) => {
    setTimerValue(currentValue);
  };

  // Render the main application UI
  // It includes a button to toggle the DataStream visibility, the DataStream component, and the Timer component
  // The timer value and its end state are displayed below the Timer component
  // The DataStream component is conditionally rendered based on the state
  return (
    <div className="App">
      <header className="App-header">
        {/* Button to toggle the DataStream component visibility */}
        <button onClick={handleButtonClick}>
          {showDataStream
            ? "Reload local observations"
            : "Load local observations"}
        </button>
        {/* Conditionally render the DataStream component based on the state */}
        {(!timerValue || showDataStream) && <DataStream />}
      </header>
      {/* Timer component that counts down from 10 seconds */}
      {/* It triggers the handleTimerEnd function when the timer ends */}
      {/* The timer value is displayed below the Timer component */}
      <Timer
        key={timerKey}
        initialSeconds={10}
        onTimerEnd={handleTimerEnd}
        onTimerUpdate={handleTimerValue}
      />
      {/* Display the timer value and its end state */}
      <p>Timer value: {timerValue}</p>
      {timerEnded && <p>Timer has ended.</p>}
    </div>
  );
}

export default App;
