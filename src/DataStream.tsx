import React, { useState, useEffect } from "react";

// DataStream component that connects to a server-sent events endpoint
function DataStream() {
  const [data, setData] = useState<any[]>([]);

  // Effect to set up the EventSource connection to the server
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
    // Handle the open event to confirm connection
    eventSource.onerror = (event) => {
      console.error("EventSource failed:", event);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Render the data in a table format
  return (
    <div>
      {/* Display a header for the data stream */}
      <h1>
        Filtered iNaturalist Observations Around Arlington, MA with a created
        date within 24 hours{" "}
      </h1>
      {/* Render 3 fields as table columns */}
      <table>
        {data.map((item, index) => (
          <tr>
            <td>{item.obs_observed_on_string}</td>
            <td>{item.obs_species_guess}</td>
            <td>{item.obs_place_guess}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default DataStream;
