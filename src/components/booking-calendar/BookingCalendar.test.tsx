import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookingCalendar from "./BookingCalendar";


describe("Booking Calendar component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <BookingCalendar />
      </MemoryRouter>
    );

   });
  });
