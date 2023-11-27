import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookingCalendar from "./BookingCalendar";

describe("Booking Calendar component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <BookingCalendar />
      </MemoryRouter>
    );

   });
   test("selects start date", () => {
    render(
      <MemoryRouter>
        <BookingCalendar />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByPlaceholderText("From-Date"));
    const startDate = screen.getByLabelText("Choose Wednesday, November 1st, 2023"); 
    fireEvent.click(startDate);
    expect((screen.getByPlaceholderText("From-Date") as HTMLInputElement).value).toContain("1");
  });
  test("selects end date", () => {
    render(
      <MemoryRouter>
        <BookingCalendar />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByPlaceholderText("To-Date"));
    const endDate = screen.getByText("10") as HTMLElement; 
    fireEvent.click(endDate);
    expect((screen.getByPlaceholderText("To-Date") as HTMLInputElement).value).toContain("10");
  });

});
