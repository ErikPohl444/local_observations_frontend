import React, {useState} from "react";
import "./App.css";
import DataStream from "./DataStream";

function App() {
  const [showDataStream, setShowDataStream] = useState(false);
  const handleButtonClick = () => {
    setShowDataStream(!showDataStream); // This toggles the button state, 
    // allowing for loading and reloading
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={handleButtonClick}>
          {showDataStream ? "Reload local observations" : "Load local observations"}
        </button>
        {showDataStream && <DataStream />}
      </header>
    </div>
  );
}

export default App;
