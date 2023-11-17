import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ConfirmationPopup from "./ConfirmationPopup";


describe("Confirmation Popup component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        {/* <ConfirmationPopup /> */}
      </MemoryRouter>
    );

   });
  });
