import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";

describe("Footer component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

   });
  });
