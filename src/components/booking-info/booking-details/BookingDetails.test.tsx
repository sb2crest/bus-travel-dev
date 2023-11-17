import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookingDetails from "./BookingDetails";


describe("Booking Details component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <BookingDetails bookingDetails= ""/>
      </MemoryRouter>
    );

   });
  });
