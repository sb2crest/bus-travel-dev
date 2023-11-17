import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ImageSliderParent from "./ImageSliderParent";


describe("Booking component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <ImageSliderParent />
      </MemoryRouter>
    );

   });
  });
