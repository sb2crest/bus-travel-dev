import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Contact from "./Contact";


describe("Contact component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );

   });
  });
