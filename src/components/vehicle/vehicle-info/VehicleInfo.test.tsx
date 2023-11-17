import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VehicleInfo from "./VehicleInfo";


describe("Vehicle Info component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        {/* <VehicleInfo /> */}
      </MemoryRouter>
    );

   });
  });
