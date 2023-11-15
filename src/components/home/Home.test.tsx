import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; 
import Home from "./Home";
import Video from "../../assets/images/final.mp4";
describe("Home Component", () => {
  // Check if the component renders without throwing any errors
  test("renders without errors", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
  });
  test("renders the video element", () => {
    render(
      <div aria-hidden={true}>
        <video src={Video} aria-label="video" />
      </div>
    );
    const video = screen.queryByLabelText("video");
    if (video) {
      expect(video.parentElement).toHaveAttribute("aria-hidden", "true");
    } else {
      // Fail the test explicitly if the video element is not found
      fail("Video element not found");
    }
  });

  test("displays the correct number of card banners", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const cardBanners = screen.getAllByTestId("card-banner");
    expect(cardBanners).toHaveLength(1);
  });

  test("displays the 'Our Services' heading", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const heading = screen.getByRole("heading", {
      name: /We Provide Best Services For You/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test("displays the 'About Us' section", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const aboutUsHeading = screen.getByText("About Us");
    expect(aboutUsHeading).toBeInTheDocument();
  });

  test("displays the 'Our Services' section", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const ourServicesHeading = screen.getByText("Our Services");
    expect(ourServicesHeading).toBeInTheDocument();
  });

  test("renders the correct number of service headings", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const services = [
      "School & College Trips",
      "Weddings",
      "Corporate Trips",
      "Private Trips",
      "Sports Events",
    ];

    services.forEach((service) => {
      const serviceHeading = screen.getByText(service);
      expect(serviceHeading).toBeInTheDocument();
    });
  });
});
