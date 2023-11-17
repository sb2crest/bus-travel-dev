import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Booking from "./Booking";


describe("Booking component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

   });
  });
