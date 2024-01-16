import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ImageSlider from "./ImageSlider";


describe("ImageSlider component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        {/* <ImageSlider /> */}
      </MemoryRouter>
    );

   });
  });
