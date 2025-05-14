import React, { useState, useEffect } from "react";
import { ObjectFlags } from "typescript";

function DataStream() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/stream");

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        console.log("Received data:", parsedData);
        setData((prevData) => [...prevData, parsedData]);
      } catch (error) {
        console.error("Error parsing event data:", error, event.data);
      }
    };

    eventSource.onerror = (event) => {
      console.error("EventSource failed:", event);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h1>Streaming Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.obs_date} {item.obs_species_guess} {item.obs_place_guess}{" "}
            {JSON.stringify(item)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataStream;
