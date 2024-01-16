import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Map from "./Map";

describe("Booking component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Map />
      </MemoryRouter>
    );
  });
  test("renders Google Map", () => {
    render(<Map />)
    const googleMapIframe = screen.getByTitle('Google Map');
    expect(googleMapIframe).toBeInTheDocument();
  })
});
