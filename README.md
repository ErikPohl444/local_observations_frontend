# Local Observations Frontend

A React + TypeScript application designed to display tabular data streamed from a backend endpoint. This project provides real-time observation data visualization in a simple and intuitive interface.

The observation data comes from an endpoint I wrote in Python using Flask, one which draws data from iNaturalist observation data for the past 24-hours for a 25-mile radius around Arlington, MA.

## Features

- **Live Data Streaming**: 
  - Uses the `EventSource` API to connect to a streaming endpoint (`http://localhost:5000/stream`).
  - Handles dynamic updates of observation data in real time.
  
- **Dynamic Table Rendering**:
  - Displays streamed data in a tabular format with the following columns:
    - **Observation Date** (`obs_date`)
    - **Species Guess** (`obs_species_guess`)
    - **Place Guess** (`obs_place_guess`).

- **Error Handling**: 
  - Manages connection errors and gracefully closes the stream when the server signals "end".

- **Modular Design**:
  - `DataStream` component encapsulates the data-fetching and rendering logic.
  - The `App` component serves as the main entry point and integrates `DataStream` with the application layout.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ErikPohl444/local_observations_frontend.git
   cd local_observations_frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## File Structure

### `src/App.tsx`

The root component of the application, responsible for rendering the layout and integrating the `DataStream` component.

```tsx
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DataStream />
      </header>
    </div>
  );
}
```

### `src/DataStream.tsx`

This component manages the live data stream and renders the data in a table. It connects to the backend's streaming endpoint and processes incoming data dynamically.

Key functionality:
- Opens a connection to the backend using `EventSource`.
- Handles incoming messages and updates the state with new data.
- Cleans up the connection when the component is unmounted or when the server signals the end of the stream.

```tsx
useEffect(() => {
  const eventSource = new EventSource("http://localhost:5000/stream");

  eventSource.onmessage = (event) => {
    // Process incoming data
  };

  eventSource.onerror = (event) => {
    console.error("EventSource failed:", event);
    eventSource.close();
  };

  return () => {
    eventSource.close();
  };
}, []);
```

## Usage

1. Run the app and ensure the backend is serving data at `http://localhost:5000/stream`.
2. The frontend will automatically connect to the stream and display observation data in real time.

## Styling

The app uses `App.css` to provide basic styling for the layout and components. You can customize the styles to match your requirements.

## Contributing

Feel free to fork this repository and open pull requests for any enhancements or bug fixes. For major changes, please open an issue to discuss what you would like to change.

## License

This project is licensed under the [MIT License](LICENSE).
