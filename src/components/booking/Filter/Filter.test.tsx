import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Filter from "./Filter";

describe("Filter component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Filter />
      </MemoryRouter>
    );

  });
});
