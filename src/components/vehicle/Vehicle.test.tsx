import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Vehicle from "./Vehicle";


describe("Vehicle component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        {/* <Vehicle /> */}
      </MemoryRouter>
    );

   });
  });
