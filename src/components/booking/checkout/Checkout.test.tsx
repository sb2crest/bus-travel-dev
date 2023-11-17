import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Checkout from "./Checkout";


describe("Checkout component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Checkout bookingId="cx1212" phoneNumber= "9999999999" fromDate={new Date()} toDate={new Date()} />
      </MemoryRouter>
    );

   });
  });
