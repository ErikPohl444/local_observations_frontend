import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DataStream from "./DataStream";

// Mock EventSource
class MockEventSource {
  onmessage: ((event: any) => void) | null = null;
  onerror: ((event: any) => void) | null = null;
  close = jest.fn();

  constructor(url: string) {
    setTimeout(() => {
      // Simulate receiving a message
      this.onmessage &&
        this.onmessage({
          data: JSON.stringify({
            obs_observed_on_string: "2024-06-01",
            obs_species_guess: "Robin",
            obs_place_guess: "Arlington, MA",
          }),
        });
      // Simulate end message
      setTimeout(() => {
        this.onmessage && this.onmessage({ data: "end" });
      }, 100);
    }, 100);
  }
}

(global as any).EventSource = MockEventSource;

describe("DataStream", () => {
  it("renders and displays streamed data", async () => {
    render(<DataStream />);
    expect(
      screen.getByText(/Filtered iNaturalist Observations/i)
    ).toBeInTheDocument();

    // Wait for the streamed data to appear
    await waitFor(() =>
      expect(screen.getByText("2024-06-01")).toBeInTheDocument()
    );
    expect(screen.getByText("Robin")).toBeInTheDocument();
    expect(screen.getByText("Arlington, MA")).toBeInTheDocument();
  });
});
