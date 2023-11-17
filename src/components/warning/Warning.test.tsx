import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Warning from "./Warning";



describe("Booking component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Warning onClose= ""/>
      </MemoryRouter>
    );

   });
  });
