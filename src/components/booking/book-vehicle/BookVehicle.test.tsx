import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookVehicle from "./BookVehicle";



describe("Book Vehicle component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <BookVehicle />
      </MemoryRouter>
    );

   });
  });
