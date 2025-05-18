import React, { useState } from "react";
import "./App.css";
import DataStream from "./DataStream";
import Timer from "./Timer";

function App() {
  const [showDataStream, setShowDataStream] = useState(false);
  const handleButtonClick = () => {
    setShowDataStream(!showDataStream); // This toggles the button state,
    // allowing for loading and reloading
  };
  const [timerValue, setTimerValue] = useState(0);
  const [timerEnded, setTimerEnded] = useState(false);

  const handleTimerEnd = () => {
    setTimerEnded(true);
    setTimerValue(10); // Reset the timer value to the initial value
    setTimeout(() => {
      setTimerEnded(false); // Restart the timer by toggling the state
    }, 0);
  };

  const handleTimerValue = (currentValue: number) => {
    setTimerValue(currentValue); // Update timerValue with the current timer value
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleButtonClick}>
          {showDataStream
            ? "Reload local observations"
            : "Load local observations"}
        </button>
        {(!timerValue || showDataStream) && <DataStream />}
      </header>
      <Timer
        initialSeconds={10}
        onTimerEnd={handleTimerEnd}
        onTimerUpdate={handleTimerValue} // Pass handleTimerValue to Timer
      />
      <p>Timer value: {timerValue}</p>
      {timerEnded && <p>Timer has ended.</p>}
    </div>
  );
}

export default App;