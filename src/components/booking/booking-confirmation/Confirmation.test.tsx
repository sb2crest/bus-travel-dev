import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Confirmation from "./Confirmation";


describe("Confirmation component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Confirmation />
      </MemoryRouter>
    );

   });
  });
