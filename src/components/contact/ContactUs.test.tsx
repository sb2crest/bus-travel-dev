import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ContactUs from "./ContactUs";


describe("Contact Us component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>
    );

   });
  });
