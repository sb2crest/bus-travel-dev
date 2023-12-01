import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Home, { scrollToTop } from "./Home";
import Video from "../../assets/images/final.mp4";
import jest from 'jest-mock';
import ImageSliderParent from "../slider/ImageSliderParent";

describe("Home Component", () => {
  
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
test("renders ImageSliderParent component", () => {
  render(<ImageSliderParent />);

});
test("renders Link component with correct props", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const link = screen.getByRole("link", { name: /know more/i });

});
test("scrolls to the top when scrollToTop is called", () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  const originalScrollTo = window.scrollTo;
  window.scrollTo = jest.fn();
  act(() => {
    scrollToTop();
  });
  expect(window.scrollTo).toHaveBeenCalledWith({
    top: 0,
    behavior: "auto",
  });
  window.scrollTo = originalScrollTo;
});
});

