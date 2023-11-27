import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";


test('renders without crashing', () => {
  const { baseElement } = render(<App />);
  expect(baseElement).toBeDefined();
});
test("WHEN user is in /booking route THEN render Booking component", async () => {
  window.history.pushState({}, "", "/booking");
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const bookYourNextTripRegex = /Book your next trip/i; 
  expect(screen.getByText(bookYourNextTripRegex)).toBeInTheDocument();
});
