import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VehiclesList from "./VehicleList";


describe("Vehicles List component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <VehiclesList />
      </MemoryRouter>
    );

   });
  });
