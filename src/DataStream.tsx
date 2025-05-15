import React, { useState, useEffect } from "react";

function DataStream() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:5000/stream");

    eventSource.onmessage = (event) => {
      if (event.data === "end") {
        console.log("end received");
        eventSource.close();
        console.log("Stream closed by server.");
      } else {
        try {
          const parsedData = JSON.parse(event.data);
          console.log("Received data:", parsedData);
          setData((prevData) => [...prevData, parsedData]);
        } catch (error) {
          console.error("Error parsing event data:", error, event.data);
        }
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
      <table>
        {data.map((item, index) => (
          <tr>
            <td>{item.obs_date}</td>
            <td>{item.obs_species_guess}</td>
            <td>{item.obs_place_guess}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default DataStream;
