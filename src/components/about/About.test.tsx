import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AboutUs from "./AboutUs";

describe("AboutUs component", () => {
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );

    // Make your queries more specific
    const mainHeading = screen.getByRole("heading", {
      level: 1,
      name: /About Us/i,
    });
    const missionHeading = screen.getByRole("heading", {
      name: /Our Mission/i,
    });
    const visionHeading = screen.getByRole("heading", { name: /Our Vision/i });

    expect(mainHeading).toBeInTheDocument();
    expect(missionHeading).toBeInTheDocument();
    expect(visionHeading).toBeInTheDocument();
  });

  test("renders images correctly", () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );

    const aboutUsImages = screen.getAllByAltText("");
    const schooltripImages = screen.getAllByAltText("School & College Trips");
    const weddingImages = screen.getAllByAltText("Weddings");
    const tripsImages = screen.getAllByAltText("Corporate Trips");
    const privatetripImages = screen.getAllByAltText("Private Trips");
    const sportseventImages = screen.getAllByAltText("Sports Events");

    // Check that there's at least one image for each category
    expect(aboutUsImages.length).toBeGreaterThanOrEqual(1);
    expect(schooltripImages.length).toBeGreaterThanOrEqual(1);
    expect(weddingImages.length).toBeGreaterThanOrEqual(1);
    expect(tripsImages.length).toBeGreaterThanOrEqual(1);
    expect(privatetripImages.length).toBeGreaterThanOrEqual(1);
    expect(sportseventImages.length).toBeGreaterThanOrEqual(1);
  });

  test("renders key points", () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );
    const keyPoints = screen.getAllByTestId("key-point");
    expect(keyPoints).toHaveLength(8);
  });

  test("renders mission and vision content", () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );

    const missionContent = screen.getByTestId("mission-content");
    const visionContent = screen.getByTestId("vision-content");

    expect(missionContent).toBeInTheDocument();
    expect(visionContent).toBeInTheDocument();
  });

  // Add more test cases as needed, for example, testing animations, links, etc.
});
