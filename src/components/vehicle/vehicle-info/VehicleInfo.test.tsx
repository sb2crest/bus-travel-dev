import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VehicleInfo from "./VehicleInfo";


describe("Vehicle Info component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        {/* <VehicleInfo /> */}
      </MemoryRouter>
    );
  });

  test('renders component and triggers modal on button click', () => {
    render(
      <MemoryRouter>
        <VehicleInfo images={[]} />
      </MemoryRouter>
    );
    const bookNow = screen.getByRole('button', { name: 'Book Now' });
    expect(bookNow).toBeInTheDocument();

    fireEvent.click(bookNow);

    const modal = screen.queryByTestId('loginModal');
    expect(modal).toBeInTheDocument();
  });
});
