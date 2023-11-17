import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cards from "./Cards";


describe("Cards component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Cards />
      </MemoryRouter>
    );

   });
  });
