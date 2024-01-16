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
  test("renders contact cards", () => {
    render(<Contact />)
    const emailSection = screen.getByText(/Email/i);
    expect(emailSection).toBeInTheDocument();
    const emailAddress = screen.getByText(/info@seabed2crest.com/i);
    expect(emailAddress).toBeInTheDocument();
    const phoneSection = screen.getByText(/Phone/i);
    expect(phoneSection).toBeInTheDocument();
    const phoneNumber1 = screen.getByText(/7349368311/i);
    const phoneNumber2 = screen.getByText(/7979699428/i);
    expect(phoneNumber1).toBeInTheDocument();
    expect(phoneNumber2).toBeInTheDocument();
    const addressSection = screen.getByText(/Address/i);
    expect(addressSection).toBeInTheDocument();
    const address = screen.getByText(/102, 1st floor, AjjeGowdru Nilaya, 7th A Cross Rd, Yelahanka Satellite Town, Yelahanka, Bengaluru, Karnataka 560064/i);
    expect(address).toBeInTheDocument();
  })
});
